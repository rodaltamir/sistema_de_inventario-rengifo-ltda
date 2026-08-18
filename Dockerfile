FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client for master and tenant
RUN npx prisma generate --schema=prisma/master.prisma
RUN npx prisma generate --schema=prisma/tenant.prisma

ENV NEXT_TELEMETRY_DISABLED 1

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# We need prisma in production to allow `prisma db push` dynamically for new tenants.
# Since we use `exec("npx prisma db push ...")` in the API, we need `npx` and `prisma` CLI.
# To keep it simple, we just copy the entire node_modules from builder. 
# Standalone mode usually excludes devDependencies like prisma CLI.
# Alternatively, we install it in production, or copy the Prisma CLI.
# Let's ensure prisma CLI is available:
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# We also copy node_modules to the standalone app to ensure prisma CLI can be run
# Standalone already has its own node_modules for dependencies, but we override it 
# to include everything just in case for the execAsync call.

USER root
# Ensure npx can run prisma
RUN npm install -g prisma@5.22.0

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
