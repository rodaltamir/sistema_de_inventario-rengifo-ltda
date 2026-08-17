
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Proveedor
 * 
 */
export type Proveedor = $Result.DefaultSelection<Prisma.$ProveedorPayload>
/**
 * Model Categoria
 * 
 */
export type Categoria = $Result.DefaultSelection<Prisma.$CategoriaPayload>
/**
 * Model Producto
 * 
 */
export type Producto = $Result.DefaultSelection<Prisma.$ProductoPayload>
/**
 * Model Transaccion
 * 
 */
export type Transaccion = $Result.DefaultSelection<Prisma.$TransaccionPayload>
/**
 * Model DetalleTransaccion
 * 
 */
export type DetalleTransaccion = $Result.DefaultSelection<Prisma.$DetalleTransaccionPayload>
/**
 * Model Pago
 * 
 */
export type Pago = $Result.DefaultSelection<Prisma.$PagoPayload>
/**
 * Model DeudaCredito
 * 
 */
export type DeudaCredito = $Result.DefaultSelection<Prisma.$DeudaCreditoPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Proveedors
 * const proveedors = await prisma.proveedor.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Proveedors
   * const proveedors = await prisma.proveedor.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.proveedor`: Exposes CRUD operations for the **Proveedor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Proveedors
    * const proveedors = await prisma.proveedor.findMany()
    * ```
    */
  get proveedor(): Prisma.ProveedorDelegate<ExtArgs>;

  /**
   * `prisma.categoria`: Exposes CRUD operations for the **Categoria** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categorias
    * const categorias = await prisma.categoria.findMany()
    * ```
    */
  get categoria(): Prisma.CategoriaDelegate<ExtArgs>;

  /**
   * `prisma.producto`: Exposes CRUD operations for the **Producto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Productos
    * const productos = await prisma.producto.findMany()
    * ```
    */
  get producto(): Prisma.ProductoDelegate<ExtArgs>;

  /**
   * `prisma.transaccion`: Exposes CRUD operations for the **Transaccion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transaccions
    * const transaccions = await prisma.transaccion.findMany()
    * ```
    */
  get transaccion(): Prisma.TransaccionDelegate<ExtArgs>;

  /**
   * `prisma.detalleTransaccion`: Exposes CRUD operations for the **DetalleTransaccion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DetalleTransaccions
    * const detalleTransaccions = await prisma.detalleTransaccion.findMany()
    * ```
    */
  get detalleTransaccion(): Prisma.DetalleTransaccionDelegate<ExtArgs>;

  /**
   * `prisma.pago`: Exposes CRUD operations for the **Pago** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pagos
    * const pagos = await prisma.pago.findMany()
    * ```
    */
  get pago(): Prisma.PagoDelegate<ExtArgs>;

  /**
   * `prisma.deudaCredito`: Exposes CRUD operations for the **DeudaCredito** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeudaCreditos
    * const deudaCreditos = await prisma.deudaCredito.findMany()
    * ```
    */
  get deudaCredito(): Prisma.DeudaCreditoDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Proveedor: 'Proveedor',
    Categoria: 'Categoria',
    Producto: 'Producto',
    Transaccion: 'Transaccion',
    DetalleTransaccion: 'DetalleTransaccion',
    Pago: 'Pago',
    DeudaCredito: 'DeudaCredito'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "proveedor" | "categoria" | "producto" | "transaccion" | "detalleTransaccion" | "pago" | "deudaCredito"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Proveedor: {
        payload: Prisma.$ProveedorPayload<ExtArgs>
        fields: Prisma.ProveedorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProveedorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProveedorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>
          }
          findFirst: {
            args: Prisma.ProveedorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProveedorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>
          }
          findMany: {
            args: Prisma.ProveedorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>[]
          }
          create: {
            args: Prisma.ProveedorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>
          }
          createMany: {
            args: Prisma.ProveedorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProveedorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>[]
          }
          delete: {
            args: Prisma.ProveedorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>
          }
          update: {
            args: Prisma.ProveedorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>
          }
          deleteMany: {
            args: Prisma.ProveedorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProveedorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProveedorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>
          }
          aggregate: {
            args: Prisma.ProveedorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProveedor>
          }
          groupBy: {
            args: Prisma.ProveedorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProveedorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProveedorCountArgs<ExtArgs>
            result: $Utils.Optional<ProveedorCountAggregateOutputType> | number
          }
        }
      }
      Categoria: {
        payload: Prisma.$CategoriaPayload<ExtArgs>
        fields: Prisma.CategoriaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoriaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoriaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findFirst: {
            args: Prisma.CategoriaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoriaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findMany: {
            args: Prisma.CategoriaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          create: {
            args: Prisma.CategoriaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          createMany: {
            args: Prisma.CategoriaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoriaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          delete: {
            args: Prisma.CategoriaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          update: {
            args: Prisma.CategoriaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          deleteMany: {
            args: Prisma.CategoriaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoriaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoriaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          aggregate: {
            args: Prisma.CategoriaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoria>
          }
          groupBy: {
            args: Prisma.CategoriaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoriaCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriaCountAggregateOutputType> | number
          }
        }
      }
      Producto: {
        payload: Prisma.$ProductoPayload<ExtArgs>
        fields: Prisma.ProductoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          findFirst: {
            args: Prisma.ProductoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          findMany: {
            args: Prisma.ProductoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>[]
          }
          create: {
            args: Prisma.ProductoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          createMany: {
            args: Prisma.ProductoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>[]
          }
          delete: {
            args: Prisma.ProductoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          update: {
            args: Prisma.ProductoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          deleteMany: {
            args: Prisma.ProductoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          aggregate: {
            args: Prisma.ProductoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProducto>
          }
          groupBy: {
            args: Prisma.ProductoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductoCountArgs<ExtArgs>
            result: $Utils.Optional<ProductoCountAggregateOutputType> | number
          }
        }
      }
      Transaccion: {
        payload: Prisma.$TransaccionPayload<ExtArgs>
        fields: Prisma.TransaccionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransaccionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransaccionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransaccionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransaccionPayload>
          }
          findFirst: {
            args: Prisma.TransaccionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransaccionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransaccionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransaccionPayload>
          }
          findMany: {
            args: Prisma.TransaccionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransaccionPayload>[]
          }
          create: {
            args: Prisma.TransaccionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransaccionPayload>
          }
          createMany: {
            args: Prisma.TransaccionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransaccionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransaccionPayload>[]
          }
          delete: {
            args: Prisma.TransaccionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransaccionPayload>
          }
          update: {
            args: Prisma.TransaccionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransaccionPayload>
          }
          deleteMany: {
            args: Prisma.TransaccionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransaccionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TransaccionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransaccionPayload>
          }
          aggregate: {
            args: Prisma.TransaccionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaccion>
          }
          groupBy: {
            args: Prisma.TransaccionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransaccionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransaccionCountArgs<ExtArgs>
            result: $Utils.Optional<TransaccionCountAggregateOutputType> | number
          }
        }
      }
      DetalleTransaccion: {
        payload: Prisma.$DetalleTransaccionPayload<ExtArgs>
        fields: Prisma.DetalleTransaccionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DetalleTransaccionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleTransaccionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DetalleTransaccionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleTransaccionPayload>
          }
          findFirst: {
            args: Prisma.DetalleTransaccionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleTransaccionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DetalleTransaccionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleTransaccionPayload>
          }
          findMany: {
            args: Prisma.DetalleTransaccionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleTransaccionPayload>[]
          }
          create: {
            args: Prisma.DetalleTransaccionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleTransaccionPayload>
          }
          createMany: {
            args: Prisma.DetalleTransaccionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DetalleTransaccionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleTransaccionPayload>[]
          }
          delete: {
            args: Prisma.DetalleTransaccionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleTransaccionPayload>
          }
          update: {
            args: Prisma.DetalleTransaccionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleTransaccionPayload>
          }
          deleteMany: {
            args: Prisma.DetalleTransaccionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DetalleTransaccionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DetalleTransaccionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleTransaccionPayload>
          }
          aggregate: {
            args: Prisma.DetalleTransaccionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDetalleTransaccion>
          }
          groupBy: {
            args: Prisma.DetalleTransaccionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DetalleTransaccionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DetalleTransaccionCountArgs<ExtArgs>
            result: $Utils.Optional<DetalleTransaccionCountAggregateOutputType> | number
          }
        }
      }
      Pago: {
        payload: Prisma.$PagoPayload<ExtArgs>
        fields: Prisma.PagoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PagoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PagoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          findFirst: {
            args: Prisma.PagoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PagoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          findMany: {
            args: Prisma.PagoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>[]
          }
          create: {
            args: Prisma.PagoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          createMany: {
            args: Prisma.PagoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PagoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>[]
          }
          delete: {
            args: Prisma.PagoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          update: {
            args: Prisma.PagoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          deleteMany: {
            args: Prisma.PagoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PagoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PagoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          aggregate: {
            args: Prisma.PagoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePago>
          }
          groupBy: {
            args: Prisma.PagoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PagoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PagoCountArgs<ExtArgs>
            result: $Utils.Optional<PagoCountAggregateOutputType> | number
          }
        }
      }
      DeudaCredito: {
        payload: Prisma.$DeudaCreditoPayload<ExtArgs>
        fields: Prisma.DeudaCreditoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeudaCreditoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeudaCreditoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeudaCreditoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeudaCreditoPayload>
          }
          findFirst: {
            args: Prisma.DeudaCreditoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeudaCreditoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeudaCreditoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeudaCreditoPayload>
          }
          findMany: {
            args: Prisma.DeudaCreditoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeudaCreditoPayload>[]
          }
          create: {
            args: Prisma.DeudaCreditoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeudaCreditoPayload>
          }
          createMany: {
            args: Prisma.DeudaCreditoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeudaCreditoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeudaCreditoPayload>[]
          }
          delete: {
            args: Prisma.DeudaCreditoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeudaCreditoPayload>
          }
          update: {
            args: Prisma.DeudaCreditoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeudaCreditoPayload>
          }
          deleteMany: {
            args: Prisma.DeudaCreditoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeudaCreditoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DeudaCreditoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeudaCreditoPayload>
          }
          aggregate: {
            args: Prisma.DeudaCreditoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeudaCredito>
          }
          groupBy: {
            args: Prisma.DeudaCreditoGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeudaCreditoGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeudaCreditoCountArgs<ExtArgs>
            result: $Utils.Optional<DeudaCreditoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProveedorCountOutputType
   */

  export type ProveedorCountOutputType = {
    productos: number
  }

  export type ProveedorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productos?: boolean | ProveedorCountOutputTypeCountProductosArgs
  }

  // Custom InputTypes
  /**
   * ProveedorCountOutputType without action
   */
  export type ProveedorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProveedorCountOutputType
     */
    select?: ProveedorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProveedorCountOutputType without action
   */
  export type ProveedorCountOutputTypeCountProductosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoWhereInput
  }


  /**
   * Count Type CategoriaCountOutputType
   */

  export type CategoriaCountOutputType = {
    productos: number
  }

  export type CategoriaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productos?: boolean | CategoriaCountOutputTypeCountProductosArgs
  }

  // Custom InputTypes
  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriaCountOutputType
     */
    select?: CategoriaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeCountProductosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoWhereInput
  }


  /**
   * Count Type ProductoCountOutputType
   */

  export type ProductoCountOutputType = {
    detalles: number
  }

  export type ProductoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detalles?: boolean | ProductoCountOutputTypeCountDetallesArgs
  }

  // Custom InputTypes
  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoCountOutputType
     */
    select?: ProductoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountDetallesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DetalleTransaccionWhereInput
  }


  /**
   * Count Type TransaccionCountOutputType
   */

  export type TransaccionCountOutputType = {
    detalles: number
    pagos: number
  }

  export type TransaccionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detalles?: boolean | TransaccionCountOutputTypeCountDetallesArgs
    pagos?: boolean | TransaccionCountOutputTypeCountPagosArgs
  }

  // Custom InputTypes
  /**
   * TransaccionCountOutputType without action
   */
  export type TransaccionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransaccionCountOutputType
     */
    select?: TransaccionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TransaccionCountOutputType without action
   */
  export type TransaccionCountOutputTypeCountDetallesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DetalleTransaccionWhereInput
  }

  /**
   * TransaccionCountOutputType without action
   */
  export type TransaccionCountOutputTypeCountPagosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Proveedor
   */

  export type AggregateProveedor = {
    _count: ProveedorCountAggregateOutputType | null
    _min: ProveedorMinAggregateOutputType | null
    _max: ProveedorMaxAggregateOutputType | null
  }

  export type ProveedorMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    nit: string | null
    responsable: string | null
    telefono: string | null
    logo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProveedorMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    nit: string | null
    responsable: string | null
    telefono: string | null
    logo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProveedorCountAggregateOutputType = {
    id: number
    nombre: number
    nit: number
    responsable: number
    telefono: number
    logo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProveedorMinAggregateInputType = {
    id?: true
    nombre?: true
    nit?: true
    responsable?: true
    telefono?: true
    logo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProveedorMaxAggregateInputType = {
    id?: true
    nombre?: true
    nit?: true
    responsable?: true
    telefono?: true
    logo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProveedorCountAggregateInputType = {
    id?: true
    nombre?: true
    nit?: true
    responsable?: true
    telefono?: true
    logo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProveedorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proveedor to aggregate.
     */
    where?: ProveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proveedors to fetch.
     */
    orderBy?: ProveedorOrderByWithRelationInput | ProveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proveedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Proveedors
    **/
    _count?: true | ProveedorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProveedorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProveedorMaxAggregateInputType
  }

  export type GetProveedorAggregateType<T extends ProveedorAggregateArgs> = {
        [P in keyof T & keyof AggregateProveedor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProveedor[P]>
      : GetScalarType<T[P], AggregateProveedor[P]>
  }




  export type ProveedorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProveedorWhereInput
    orderBy?: ProveedorOrderByWithAggregationInput | ProveedorOrderByWithAggregationInput[]
    by: ProveedorScalarFieldEnum[] | ProveedorScalarFieldEnum
    having?: ProveedorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProveedorCountAggregateInputType | true
    _min?: ProveedorMinAggregateInputType
    _max?: ProveedorMaxAggregateInputType
  }

  export type ProveedorGroupByOutputType = {
    id: string
    nombre: string
    nit: string
    responsable: string | null
    telefono: string | null
    logo: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProveedorCountAggregateOutputType | null
    _min: ProveedorMinAggregateOutputType | null
    _max: ProveedorMaxAggregateOutputType | null
  }

  type GetProveedorGroupByPayload<T extends ProveedorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProveedorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProveedorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProveedorGroupByOutputType[P]>
            : GetScalarType<T[P], ProveedorGroupByOutputType[P]>
        }
      >
    >


  export type ProveedorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    nit?: boolean
    responsable?: boolean
    telefono?: boolean
    logo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productos?: boolean | Proveedor$productosArgs<ExtArgs>
    _count?: boolean | ProveedorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proveedor"]>

  export type ProveedorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    nit?: boolean
    responsable?: boolean
    telefono?: boolean
    logo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["proveedor"]>

  export type ProveedorSelectScalar = {
    id?: boolean
    nombre?: boolean
    nit?: boolean
    responsable?: boolean
    telefono?: boolean
    logo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProveedorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productos?: boolean | Proveedor$productosArgs<ExtArgs>
    _count?: boolean | ProveedorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProveedorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProveedorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Proveedor"
    objects: {
      productos: Prisma.$ProductoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      nit: string
      responsable: string | null
      telefono: string | null
      logo: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["proveedor"]>
    composites: {}
  }

  type ProveedorGetPayload<S extends boolean | null | undefined | ProveedorDefaultArgs> = $Result.GetResult<Prisma.$ProveedorPayload, S>

  type ProveedorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProveedorFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProveedorCountAggregateInputType | true
    }

  export interface ProveedorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Proveedor'], meta: { name: 'Proveedor' } }
    /**
     * Find zero or one Proveedor that matches the filter.
     * @param {ProveedorFindUniqueArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProveedorFindUniqueArgs>(args: SelectSubset<T, ProveedorFindUniqueArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Proveedor that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProveedorFindUniqueOrThrowArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProveedorFindUniqueOrThrowArgs>(args: SelectSubset<T, ProveedorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Proveedor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorFindFirstArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProveedorFindFirstArgs>(args?: SelectSubset<T, ProveedorFindFirstArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Proveedor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorFindFirstOrThrowArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProveedorFindFirstOrThrowArgs>(args?: SelectSubset<T, ProveedorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Proveedors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Proveedors
     * const proveedors = await prisma.proveedor.findMany()
     * 
     * // Get first 10 Proveedors
     * const proveedors = await prisma.proveedor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const proveedorWithIdOnly = await prisma.proveedor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProveedorFindManyArgs>(args?: SelectSubset<T, ProveedorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Proveedor.
     * @param {ProveedorCreateArgs} args - Arguments to create a Proveedor.
     * @example
     * // Create one Proveedor
     * const Proveedor = await prisma.proveedor.create({
     *   data: {
     *     // ... data to create a Proveedor
     *   }
     * })
     * 
     */
    create<T extends ProveedorCreateArgs>(args: SelectSubset<T, ProveedorCreateArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Proveedors.
     * @param {ProveedorCreateManyArgs} args - Arguments to create many Proveedors.
     * @example
     * // Create many Proveedors
     * const proveedor = await prisma.proveedor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProveedorCreateManyArgs>(args?: SelectSubset<T, ProveedorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Proveedors and returns the data saved in the database.
     * @param {ProveedorCreateManyAndReturnArgs} args - Arguments to create many Proveedors.
     * @example
     * // Create many Proveedors
     * const proveedor = await prisma.proveedor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Proveedors and only return the `id`
     * const proveedorWithIdOnly = await prisma.proveedor.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProveedorCreateManyAndReturnArgs>(args?: SelectSubset<T, ProveedorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Proveedor.
     * @param {ProveedorDeleteArgs} args - Arguments to delete one Proveedor.
     * @example
     * // Delete one Proveedor
     * const Proveedor = await prisma.proveedor.delete({
     *   where: {
     *     // ... filter to delete one Proveedor
     *   }
     * })
     * 
     */
    delete<T extends ProveedorDeleteArgs>(args: SelectSubset<T, ProveedorDeleteArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Proveedor.
     * @param {ProveedorUpdateArgs} args - Arguments to update one Proveedor.
     * @example
     * // Update one Proveedor
     * const proveedor = await prisma.proveedor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProveedorUpdateArgs>(args: SelectSubset<T, ProveedorUpdateArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Proveedors.
     * @param {ProveedorDeleteManyArgs} args - Arguments to filter Proveedors to delete.
     * @example
     * // Delete a few Proveedors
     * const { count } = await prisma.proveedor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProveedorDeleteManyArgs>(args?: SelectSubset<T, ProveedorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proveedors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Proveedors
     * const proveedor = await prisma.proveedor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProveedorUpdateManyArgs>(args: SelectSubset<T, ProveedorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Proveedor.
     * @param {ProveedorUpsertArgs} args - Arguments to update or create a Proveedor.
     * @example
     * // Update or create a Proveedor
     * const proveedor = await prisma.proveedor.upsert({
     *   create: {
     *     // ... data to create a Proveedor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Proveedor we want to update
     *   }
     * })
     */
    upsert<T extends ProveedorUpsertArgs>(args: SelectSubset<T, ProveedorUpsertArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Proveedors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorCountArgs} args - Arguments to filter Proveedors to count.
     * @example
     * // Count the number of Proveedors
     * const count = await prisma.proveedor.count({
     *   where: {
     *     // ... the filter for the Proveedors we want to count
     *   }
     * })
    **/
    count<T extends ProveedorCountArgs>(
      args?: Subset<T, ProveedorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProveedorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Proveedor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProveedorAggregateArgs>(args: Subset<T, ProveedorAggregateArgs>): Prisma.PrismaPromise<GetProveedorAggregateType<T>>

    /**
     * Group by Proveedor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProveedorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProveedorGroupByArgs['orderBy'] }
        : { orderBy?: ProveedorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProveedorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProveedorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Proveedor model
   */
  readonly fields: ProveedorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Proveedor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProveedorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    productos<T extends Proveedor$productosArgs<ExtArgs> = {}>(args?: Subset<T, Proveedor$productosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Proveedor model
   */ 
  interface ProveedorFieldRefs {
    readonly id: FieldRef<"Proveedor", 'String'>
    readonly nombre: FieldRef<"Proveedor", 'String'>
    readonly nit: FieldRef<"Proveedor", 'String'>
    readonly responsable: FieldRef<"Proveedor", 'String'>
    readonly telefono: FieldRef<"Proveedor", 'String'>
    readonly logo: FieldRef<"Proveedor", 'String'>
    readonly createdAt: FieldRef<"Proveedor", 'DateTime'>
    readonly updatedAt: FieldRef<"Proveedor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Proveedor findUnique
   */
  export type ProveedorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * Filter, which Proveedor to fetch.
     */
    where: ProveedorWhereUniqueInput
  }

  /**
   * Proveedor findUniqueOrThrow
   */
  export type ProveedorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * Filter, which Proveedor to fetch.
     */
    where: ProveedorWhereUniqueInput
  }

  /**
   * Proveedor findFirst
   */
  export type ProveedorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * Filter, which Proveedor to fetch.
     */
    where?: ProveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proveedors to fetch.
     */
    orderBy?: ProveedorOrderByWithRelationInput | ProveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proveedors.
     */
    cursor?: ProveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proveedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proveedors.
     */
    distinct?: ProveedorScalarFieldEnum | ProveedorScalarFieldEnum[]
  }

  /**
   * Proveedor findFirstOrThrow
   */
  export type ProveedorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * Filter, which Proveedor to fetch.
     */
    where?: ProveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proveedors to fetch.
     */
    orderBy?: ProveedorOrderByWithRelationInput | ProveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proveedors.
     */
    cursor?: ProveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proveedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proveedors.
     */
    distinct?: ProveedorScalarFieldEnum | ProveedorScalarFieldEnum[]
  }

  /**
   * Proveedor findMany
   */
  export type ProveedorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * Filter, which Proveedors to fetch.
     */
    where?: ProveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proveedors to fetch.
     */
    orderBy?: ProveedorOrderByWithRelationInput | ProveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Proveedors.
     */
    cursor?: ProveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proveedors.
     */
    skip?: number
    distinct?: ProveedorScalarFieldEnum | ProveedorScalarFieldEnum[]
  }

  /**
   * Proveedor create
   */
  export type ProveedorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * The data needed to create a Proveedor.
     */
    data: XOR<ProveedorCreateInput, ProveedorUncheckedCreateInput>
  }

  /**
   * Proveedor createMany
   */
  export type ProveedorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Proveedors.
     */
    data: ProveedorCreateManyInput | ProveedorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Proveedor createManyAndReturn
   */
  export type ProveedorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Proveedors.
     */
    data: ProveedorCreateManyInput | ProveedorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Proveedor update
   */
  export type ProveedorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * The data needed to update a Proveedor.
     */
    data: XOR<ProveedorUpdateInput, ProveedorUncheckedUpdateInput>
    /**
     * Choose, which Proveedor to update.
     */
    where: ProveedorWhereUniqueInput
  }

  /**
   * Proveedor updateMany
   */
  export type ProveedorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Proveedors.
     */
    data: XOR<ProveedorUpdateManyMutationInput, ProveedorUncheckedUpdateManyInput>
    /**
     * Filter which Proveedors to update
     */
    where?: ProveedorWhereInput
  }

  /**
   * Proveedor upsert
   */
  export type ProveedorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * The filter to search for the Proveedor to update in case it exists.
     */
    where: ProveedorWhereUniqueInput
    /**
     * In case the Proveedor found by the `where` argument doesn't exist, create a new Proveedor with this data.
     */
    create: XOR<ProveedorCreateInput, ProveedorUncheckedCreateInput>
    /**
     * In case the Proveedor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProveedorUpdateInput, ProveedorUncheckedUpdateInput>
  }

  /**
   * Proveedor delete
   */
  export type ProveedorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * Filter which Proveedor to delete.
     */
    where: ProveedorWhereUniqueInput
  }

  /**
   * Proveedor deleteMany
   */
  export type ProveedorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proveedors to delete
     */
    where?: ProveedorWhereInput
  }

  /**
   * Proveedor.productos
   */
  export type Proveedor$productosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    where?: ProductoWhereInput
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    cursor?: ProductoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Proveedor without action
   */
  export type ProveedorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
  }


  /**
   * Model Categoria
   */

  export type AggregateCategoria = {
    _count: CategoriaCountAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  export type CategoriaMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoriaMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoriaCountAggregateOutputType = {
    id: number
    nombre: number
    tenantId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoriaMinAggregateInputType = {
    id?: true
    nombre?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoriaMaxAggregateInputType = {
    id?: true
    nombre?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoriaCountAggregateInputType = {
    id?: true
    nombre?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoriaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categoria to aggregate.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categorias
    **/
    _count?: true | CategoriaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriaMaxAggregateInputType
  }

  export type GetCategoriaAggregateType<T extends CategoriaAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoria]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoria[P]>
      : GetScalarType<T[P], AggregateCategoria[P]>
  }




  export type CategoriaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriaWhereInput
    orderBy?: CategoriaOrderByWithAggregationInput | CategoriaOrderByWithAggregationInput[]
    by: CategoriaScalarFieldEnum[] | CategoriaScalarFieldEnum
    having?: CategoriaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriaCountAggregateInputType | true
    _min?: CategoriaMinAggregateInputType
    _max?: CategoriaMaxAggregateInputType
  }

  export type CategoriaGroupByOutputType = {
    id: string
    nombre: string
    tenantId: string
    createdAt: Date
    updatedAt: Date
    _count: CategoriaCountAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  type GetCategoriaGroupByPayload<T extends CategoriaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
        }
      >
    >


  export type CategoriaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productos?: boolean | Categoria$productosArgs<ExtArgs>
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectScalar = {
    id?: boolean
    nombre?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoriaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productos?: boolean | Categoria$productosArgs<ExtArgs>
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoriaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoriaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Categoria"
    objects: {
      productos: Prisma.$ProductoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      tenantId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["categoria"]>
    composites: {}
  }

  type CategoriaGetPayload<S extends boolean | null | undefined | CategoriaDefaultArgs> = $Result.GetResult<Prisma.$CategoriaPayload, S>

  type CategoriaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoriaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoriaCountAggregateInputType | true
    }

  export interface CategoriaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Categoria'], meta: { name: 'Categoria' } }
    /**
     * Find zero or one Categoria that matches the filter.
     * @param {CategoriaFindUniqueArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoriaFindUniqueArgs>(args: SelectSubset<T, CategoriaFindUniqueArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Categoria that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoriaFindUniqueOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoriaFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoriaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Categoria that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoriaFindFirstArgs>(args?: SelectSubset<T, CategoriaFindFirstArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Categoria that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoriaFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoriaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categorias
     * const categorias = await prisma.categoria.findMany()
     * 
     * // Get first 10 Categorias
     * const categorias = await prisma.categoria.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriaWithIdOnly = await prisma.categoria.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoriaFindManyArgs>(args?: SelectSubset<T, CategoriaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Categoria.
     * @param {CategoriaCreateArgs} args - Arguments to create a Categoria.
     * @example
     * // Create one Categoria
     * const Categoria = await prisma.categoria.create({
     *   data: {
     *     // ... data to create a Categoria
     *   }
     * })
     * 
     */
    create<T extends CategoriaCreateArgs>(args: SelectSubset<T, CategoriaCreateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categorias.
     * @param {CategoriaCreateManyArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoriaCreateManyArgs>(args?: SelectSubset<T, CategoriaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categorias and returns the data saved in the database.
     * @param {CategoriaCreateManyAndReturnArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categorias and only return the `id`
     * const categoriaWithIdOnly = await prisma.categoria.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoriaCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoriaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Categoria.
     * @param {CategoriaDeleteArgs} args - Arguments to delete one Categoria.
     * @example
     * // Delete one Categoria
     * const Categoria = await prisma.categoria.delete({
     *   where: {
     *     // ... filter to delete one Categoria
     *   }
     * })
     * 
     */
    delete<T extends CategoriaDeleteArgs>(args: SelectSubset<T, CategoriaDeleteArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Categoria.
     * @param {CategoriaUpdateArgs} args - Arguments to update one Categoria.
     * @example
     * // Update one Categoria
     * const categoria = await prisma.categoria.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoriaUpdateArgs>(args: SelectSubset<T, CategoriaUpdateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categorias.
     * @param {CategoriaDeleteManyArgs} args - Arguments to filter Categorias to delete.
     * @example
     * // Delete a few Categorias
     * const { count } = await prisma.categoria.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoriaDeleteManyArgs>(args?: SelectSubset<T, CategoriaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoriaUpdateManyArgs>(args: SelectSubset<T, CategoriaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Categoria.
     * @param {CategoriaUpsertArgs} args - Arguments to update or create a Categoria.
     * @example
     * // Update or create a Categoria
     * const categoria = await prisma.categoria.upsert({
     *   create: {
     *     // ... data to create a Categoria
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categoria we want to update
     *   }
     * })
     */
    upsert<T extends CategoriaUpsertArgs>(args: SelectSubset<T, CategoriaUpsertArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaCountArgs} args - Arguments to filter Categorias to count.
     * @example
     * // Count the number of Categorias
     * const count = await prisma.categoria.count({
     *   where: {
     *     // ... the filter for the Categorias we want to count
     *   }
     * })
    **/
    count<T extends CategoriaCountArgs>(
      args?: Subset<T, CategoriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriaAggregateArgs>(args: Subset<T, CategoriaAggregateArgs>): Prisma.PrismaPromise<GetCategoriaAggregateType<T>>

    /**
     * Group by Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoriaGroupByArgs['orderBy'] }
        : { orderBy?: CategoriaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoriaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Categoria model
   */
  readonly fields: CategoriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Categoria.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoriaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    productos<T extends Categoria$productosArgs<ExtArgs> = {}>(args?: Subset<T, Categoria$productosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Categoria model
   */ 
  interface CategoriaFieldRefs {
    readonly id: FieldRef<"Categoria", 'String'>
    readonly nombre: FieldRef<"Categoria", 'String'>
    readonly tenantId: FieldRef<"Categoria", 'String'>
    readonly createdAt: FieldRef<"Categoria", 'DateTime'>
    readonly updatedAt: FieldRef<"Categoria", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Categoria findUnique
   */
  export type CategoriaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findUniqueOrThrow
   */
  export type CategoriaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findFirst
   */
  export type CategoriaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findFirstOrThrow
   */
  export type CategoriaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findMany
   */
  export type CategoriaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categorias to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria create
   */
  export type CategoriaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to create a Categoria.
     */
    data: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
  }

  /**
   * Categoria createMany
   */
  export type CategoriaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categoria createManyAndReturn
   */
  export type CategoriaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categoria update
   */
  export type CategoriaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to update a Categoria.
     */
    data: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
    /**
     * Choose, which Categoria to update.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria updateMany
   */
  export type CategoriaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
  }

  /**
   * Categoria upsert
   */
  export type CategoriaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The filter to search for the Categoria to update in case it exists.
     */
    where: CategoriaWhereUniqueInput
    /**
     * In case the Categoria found by the `where` argument doesn't exist, create a new Categoria with this data.
     */
    create: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
    /**
     * In case the Categoria was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
  }

  /**
   * Categoria delete
   */
  export type CategoriaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter which Categoria to delete.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria deleteMany
   */
  export type CategoriaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categorias to delete
     */
    where?: CategoriaWhereInput
  }

  /**
   * Categoria.productos
   */
  export type Categoria$productosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    where?: ProductoWhereInput
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    cursor?: ProductoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Categoria without action
   */
  export type CategoriaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
  }


  /**
   * Model Producto
   */

  export type AggregateProducto = {
    _count: ProductoCountAggregateOutputType | null
    _avg: ProductoAvgAggregateOutputType | null
    _sum: ProductoSumAggregateOutputType | null
    _min: ProductoMinAggregateOutputType | null
    _max: ProductoMaxAggregateOutputType | null
  }

  export type ProductoAvgAggregateOutputType = {
    stock: number | null
    costo: number | null
    precioVenta: number | null
  }

  export type ProductoSumAggregateOutputType = {
    stock: number | null
    costo: number | null
    precioVenta: number | null
  }

  export type ProductoMinAggregateOutputType = {
    codigo: string | null
    proveedorId: string | null
    nombre: string | null
    descripcion: string | null
    marca: string | null
    unidadMedida: string | null
    stock: number | null
    costo: number | null
    precioVenta: number | null
    metodoInventario: string | null
    activo: boolean | null
    categoriaId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductoMaxAggregateOutputType = {
    codigo: string | null
    proveedorId: string | null
    nombre: string | null
    descripcion: string | null
    marca: string | null
    unidadMedida: string | null
    stock: number | null
    costo: number | null
    precioVenta: number | null
    metodoInventario: string | null
    activo: boolean | null
    categoriaId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductoCountAggregateOutputType = {
    codigo: number
    proveedorId: number
    nombre: number
    descripcion: number
    marca: number
    unidadMedida: number
    stock: number
    costo: number
    precioVenta: number
    metodoInventario: number
    activo: number
    categoriaId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductoAvgAggregateInputType = {
    stock?: true
    costo?: true
    precioVenta?: true
  }

  export type ProductoSumAggregateInputType = {
    stock?: true
    costo?: true
    precioVenta?: true
  }

  export type ProductoMinAggregateInputType = {
    codigo?: true
    proveedorId?: true
    nombre?: true
    descripcion?: true
    marca?: true
    unidadMedida?: true
    stock?: true
    costo?: true
    precioVenta?: true
    metodoInventario?: true
    activo?: true
    categoriaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductoMaxAggregateInputType = {
    codigo?: true
    proveedorId?: true
    nombre?: true
    descripcion?: true
    marca?: true
    unidadMedida?: true
    stock?: true
    costo?: true
    precioVenta?: true
    metodoInventario?: true
    activo?: true
    categoriaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductoCountAggregateInputType = {
    codigo?: true
    proveedorId?: true
    nombre?: true
    descripcion?: true
    marca?: true
    unidadMedida?: true
    stock?: true
    costo?: true
    precioVenta?: true
    metodoInventario?: true
    activo?: true
    categoriaId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Producto to aggregate.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Productos
    **/
    _count?: true | ProductoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductoMaxAggregateInputType
  }

  export type GetProductoAggregateType<T extends ProductoAggregateArgs> = {
        [P in keyof T & keyof AggregateProducto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProducto[P]>
      : GetScalarType<T[P], AggregateProducto[P]>
  }




  export type ProductoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoWhereInput
    orderBy?: ProductoOrderByWithAggregationInput | ProductoOrderByWithAggregationInput[]
    by: ProductoScalarFieldEnum[] | ProductoScalarFieldEnum
    having?: ProductoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductoCountAggregateInputType | true
    _avg?: ProductoAvgAggregateInputType
    _sum?: ProductoSumAggregateInputType
    _min?: ProductoMinAggregateInputType
    _max?: ProductoMaxAggregateInputType
  }

  export type ProductoGroupByOutputType = {
    codigo: string
    proveedorId: string | null
    nombre: string
    descripcion: string
    marca: string
    unidadMedida: string
    stock: number
    costo: number
    precioVenta: number
    metodoInventario: string
    activo: boolean
    categoriaId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProductoCountAggregateOutputType | null
    _avg: ProductoAvgAggregateOutputType | null
    _sum: ProductoSumAggregateOutputType | null
    _min: ProductoMinAggregateOutputType | null
    _max: ProductoMaxAggregateOutputType | null
  }

  type GetProductoGroupByPayload<T extends ProductoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductoGroupByOutputType[P]>
            : GetScalarType<T[P], ProductoGroupByOutputType[P]>
        }
      >
    >


  export type ProductoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    codigo?: boolean
    proveedorId?: boolean
    nombre?: boolean
    descripcion?: boolean
    marca?: boolean
    unidadMedida?: boolean
    stock?: boolean
    costo?: boolean
    precioVenta?: boolean
    metodoInventario?: boolean
    activo?: boolean
    categoriaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    proveedor?: boolean | Producto$proveedorArgs<ExtArgs>
    categoria?: boolean | Producto$categoriaArgs<ExtArgs>
    detalles?: boolean | Producto$detallesArgs<ExtArgs>
    _count?: boolean | ProductoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producto"]>

  export type ProductoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    codigo?: boolean
    proveedorId?: boolean
    nombre?: boolean
    descripcion?: boolean
    marca?: boolean
    unidadMedida?: boolean
    stock?: boolean
    costo?: boolean
    precioVenta?: boolean
    metodoInventario?: boolean
    activo?: boolean
    categoriaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    proveedor?: boolean | Producto$proveedorArgs<ExtArgs>
    categoria?: boolean | Producto$categoriaArgs<ExtArgs>
  }, ExtArgs["result"]["producto"]>

  export type ProductoSelectScalar = {
    codigo?: boolean
    proveedorId?: boolean
    nombre?: boolean
    descripcion?: boolean
    marca?: boolean
    unidadMedida?: boolean
    stock?: boolean
    costo?: boolean
    precioVenta?: boolean
    metodoInventario?: boolean
    activo?: boolean
    categoriaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proveedor?: boolean | Producto$proveedorArgs<ExtArgs>
    categoria?: boolean | Producto$categoriaArgs<ExtArgs>
    detalles?: boolean | Producto$detallesArgs<ExtArgs>
    _count?: boolean | ProductoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proveedor?: boolean | Producto$proveedorArgs<ExtArgs>
    categoria?: boolean | Producto$categoriaArgs<ExtArgs>
  }

  export type $ProductoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Producto"
    objects: {
      proveedor: Prisma.$ProveedorPayload<ExtArgs> | null
      categoria: Prisma.$CategoriaPayload<ExtArgs> | null
      detalles: Prisma.$DetalleTransaccionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      codigo: string
      proveedorId: string | null
      nombre: string
      descripcion: string
      marca: string
      unidadMedida: string
      stock: number
      costo: number
      precioVenta: number
      metodoInventario: string
      activo: boolean
      categoriaId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["producto"]>
    composites: {}
  }

  type ProductoGetPayload<S extends boolean | null | undefined | ProductoDefaultArgs> = $Result.GetResult<Prisma.$ProductoPayload, S>

  type ProductoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductoCountAggregateInputType | true
    }

  export interface ProductoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Producto'], meta: { name: 'Producto' } }
    /**
     * Find zero or one Producto that matches the filter.
     * @param {ProductoFindUniqueArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductoFindUniqueArgs>(args: SelectSubset<T, ProductoFindUniqueArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Producto that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductoFindUniqueOrThrowArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Producto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindFirstArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductoFindFirstArgs>(args?: SelectSubset<T, ProductoFindFirstArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Producto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindFirstOrThrowArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Productos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Productos
     * const productos = await prisma.producto.findMany()
     * 
     * // Get first 10 Productos
     * const productos = await prisma.producto.findMany({ take: 10 })
     * 
     * // Only select the `codigo`
     * const productoWithCodigoOnly = await prisma.producto.findMany({ select: { codigo: true } })
     * 
     */
    findMany<T extends ProductoFindManyArgs>(args?: SelectSubset<T, ProductoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Producto.
     * @param {ProductoCreateArgs} args - Arguments to create a Producto.
     * @example
     * // Create one Producto
     * const Producto = await prisma.producto.create({
     *   data: {
     *     // ... data to create a Producto
     *   }
     * })
     * 
     */
    create<T extends ProductoCreateArgs>(args: SelectSubset<T, ProductoCreateArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Productos.
     * @param {ProductoCreateManyArgs} args - Arguments to create many Productos.
     * @example
     * // Create many Productos
     * const producto = await prisma.producto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductoCreateManyArgs>(args?: SelectSubset<T, ProductoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Productos and returns the data saved in the database.
     * @param {ProductoCreateManyAndReturnArgs} args - Arguments to create many Productos.
     * @example
     * // Create many Productos
     * const producto = await prisma.producto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Productos and only return the `codigo`
     * const productoWithCodigoOnly = await prisma.producto.createManyAndReturn({ 
     *   select: { codigo: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductoCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Producto.
     * @param {ProductoDeleteArgs} args - Arguments to delete one Producto.
     * @example
     * // Delete one Producto
     * const Producto = await prisma.producto.delete({
     *   where: {
     *     // ... filter to delete one Producto
     *   }
     * })
     * 
     */
    delete<T extends ProductoDeleteArgs>(args: SelectSubset<T, ProductoDeleteArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Producto.
     * @param {ProductoUpdateArgs} args - Arguments to update one Producto.
     * @example
     * // Update one Producto
     * const producto = await prisma.producto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductoUpdateArgs>(args: SelectSubset<T, ProductoUpdateArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Productos.
     * @param {ProductoDeleteManyArgs} args - Arguments to filter Productos to delete.
     * @example
     * // Delete a few Productos
     * const { count } = await prisma.producto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductoDeleteManyArgs>(args?: SelectSubset<T, ProductoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Productos
     * const producto = await prisma.producto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductoUpdateManyArgs>(args: SelectSubset<T, ProductoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Producto.
     * @param {ProductoUpsertArgs} args - Arguments to update or create a Producto.
     * @example
     * // Update or create a Producto
     * const producto = await prisma.producto.upsert({
     *   create: {
     *     // ... data to create a Producto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Producto we want to update
     *   }
     * })
     */
    upsert<T extends ProductoUpsertArgs>(args: SelectSubset<T, ProductoUpsertArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoCountArgs} args - Arguments to filter Productos to count.
     * @example
     * // Count the number of Productos
     * const count = await prisma.producto.count({
     *   where: {
     *     // ... the filter for the Productos we want to count
     *   }
     * })
    **/
    count<T extends ProductoCountArgs>(
      args?: Subset<T, ProductoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Producto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductoAggregateArgs>(args: Subset<T, ProductoAggregateArgs>): Prisma.PrismaPromise<GetProductoAggregateType<T>>

    /**
     * Group by Producto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductoGroupByArgs['orderBy'] }
        : { orderBy?: ProductoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Producto model
   */
  readonly fields: ProductoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Producto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    proveedor<T extends Producto$proveedorArgs<ExtArgs> = {}>(args?: Subset<T, Producto$proveedorArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    categoria<T extends Producto$categoriaArgs<ExtArgs> = {}>(args?: Subset<T, Producto$categoriaArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    detalles<T extends Producto$detallesArgs<ExtArgs> = {}>(args?: Subset<T, Producto$detallesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DetalleTransaccionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Producto model
   */ 
  interface ProductoFieldRefs {
    readonly codigo: FieldRef<"Producto", 'String'>
    readonly proveedorId: FieldRef<"Producto", 'String'>
    readonly nombre: FieldRef<"Producto", 'String'>
    readonly descripcion: FieldRef<"Producto", 'String'>
    readonly marca: FieldRef<"Producto", 'String'>
    readonly unidadMedida: FieldRef<"Producto", 'String'>
    readonly stock: FieldRef<"Producto", 'Int'>
    readonly costo: FieldRef<"Producto", 'Float'>
    readonly precioVenta: FieldRef<"Producto", 'Float'>
    readonly metodoInventario: FieldRef<"Producto", 'String'>
    readonly activo: FieldRef<"Producto", 'Boolean'>
    readonly categoriaId: FieldRef<"Producto", 'String'>
    readonly createdAt: FieldRef<"Producto", 'DateTime'>
    readonly updatedAt: FieldRef<"Producto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Producto findUnique
   */
  export type ProductoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto findUniqueOrThrow
   */
  export type ProductoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto findFirst
   */
  export type ProductoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Productos.
     */
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto findFirstOrThrow
   */
  export type ProductoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Productos.
     */
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto findMany
   */
  export type ProductoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Productos to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto create
   */
  export type ProductoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The data needed to create a Producto.
     */
    data: XOR<ProductoCreateInput, ProductoUncheckedCreateInput>
  }

  /**
   * Producto createMany
   */
  export type ProductoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Productos.
     */
    data: ProductoCreateManyInput | ProductoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Producto createManyAndReturn
   */
  export type ProductoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Productos.
     */
    data: ProductoCreateManyInput | ProductoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Producto update
   */
  export type ProductoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The data needed to update a Producto.
     */
    data: XOR<ProductoUpdateInput, ProductoUncheckedUpdateInput>
    /**
     * Choose, which Producto to update.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto updateMany
   */
  export type ProductoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Productos.
     */
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyInput>
    /**
     * Filter which Productos to update
     */
    where?: ProductoWhereInput
  }

  /**
   * Producto upsert
   */
  export type ProductoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The filter to search for the Producto to update in case it exists.
     */
    where: ProductoWhereUniqueInput
    /**
     * In case the Producto found by the `where` argument doesn't exist, create a new Producto with this data.
     */
    create: XOR<ProductoCreateInput, ProductoUncheckedCreateInput>
    /**
     * In case the Producto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductoUpdateInput, ProductoUncheckedUpdateInput>
  }

  /**
   * Producto delete
   */
  export type ProductoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter which Producto to delete.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto deleteMany
   */
  export type ProductoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Productos to delete
     */
    where?: ProductoWhereInput
  }

  /**
   * Producto.proveedor
   */
  export type Producto$proveedorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    where?: ProveedorWhereInput
  }

  /**
   * Producto.categoria
   */
  export type Producto$categoriaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    where?: CategoriaWhereInput
  }

  /**
   * Producto.detalles
   */
  export type Producto$detallesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleTransaccion
     */
    select?: DetalleTransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleTransaccionInclude<ExtArgs> | null
    where?: DetalleTransaccionWhereInput
    orderBy?: DetalleTransaccionOrderByWithRelationInput | DetalleTransaccionOrderByWithRelationInput[]
    cursor?: DetalleTransaccionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DetalleTransaccionScalarFieldEnum | DetalleTransaccionScalarFieldEnum[]
  }

  /**
   * Producto without action
   */
  export type ProductoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
  }


  /**
   * Model Transaccion
   */

  export type AggregateTransaccion = {
    _count: TransaccionCountAggregateOutputType | null
    _avg: TransaccionAvgAggregateOutputType | null
    _sum: TransaccionSumAggregateOutputType | null
    _min: TransaccionMinAggregateOutputType | null
    _max: TransaccionMaxAggregateOutputType | null
  }

  export type TransaccionAvgAggregateOutputType = {
    descuento: number | null
  }

  export type TransaccionSumAggregateOutputType = {
    descuento: number | null
  }

  export type TransaccionMinAggregateOutputType = {
    id: string | null
    tipoTransaccion: string | null
    nroDocumento: string | null
    fecha: Date | null
    nitCi: string | null
    razonSocial: string | null
    formaPago: string | null
    descuento: number | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransaccionMaxAggregateOutputType = {
    id: string | null
    tipoTransaccion: string | null
    nroDocumento: string | null
    fecha: Date | null
    nitCi: string | null
    razonSocial: string | null
    formaPago: string | null
    descuento: number | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransaccionCountAggregateOutputType = {
    id: number
    tipoTransaccion: number
    nroDocumento: number
    fecha: number
    nitCi: number
    razonSocial: number
    formaPago: number
    descuento: number
    observaciones: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TransaccionAvgAggregateInputType = {
    descuento?: true
  }

  export type TransaccionSumAggregateInputType = {
    descuento?: true
  }

  export type TransaccionMinAggregateInputType = {
    id?: true
    tipoTransaccion?: true
    nroDocumento?: true
    fecha?: true
    nitCi?: true
    razonSocial?: true
    formaPago?: true
    descuento?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransaccionMaxAggregateInputType = {
    id?: true
    tipoTransaccion?: true
    nroDocumento?: true
    fecha?: true
    nitCi?: true
    razonSocial?: true
    formaPago?: true
    descuento?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransaccionCountAggregateInputType = {
    id?: true
    tipoTransaccion?: true
    nroDocumento?: true
    fecha?: true
    nitCi?: true
    razonSocial?: true
    formaPago?: true
    descuento?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TransaccionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaccion to aggregate.
     */
    where?: TransaccionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transaccions to fetch.
     */
    orderBy?: TransaccionOrderByWithRelationInput | TransaccionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransaccionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transaccions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transaccions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transaccions
    **/
    _count?: true | TransaccionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransaccionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransaccionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransaccionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransaccionMaxAggregateInputType
  }

  export type GetTransaccionAggregateType<T extends TransaccionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaccion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaccion[P]>
      : GetScalarType<T[P], AggregateTransaccion[P]>
  }




  export type TransaccionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransaccionWhereInput
    orderBy?: TransaccionOrderByWithAggregationInput | TransaccionOrderByWithAggregationInput[]
    by: TransaccionScalarFieldEnum[] | TransaccionScalarFieldEnum
    having?: TransaccionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransaccionCountAggregateInputType | true
    _avg?: TransaccionAvgAggregateInputType
    _sum?: TransaccionSumAggregateInputType
    _min?: TransaccionMinAggregateInputType
    _max?: TransaccionMaxAggregateInputType
  }

  export type TransaccionGroupByOutputType = {
    id: string
    tipoTransaccion: string
    nroDocumento: string
    fecha: Date
    nitCi: string
    razonSocial: string
    formaPago: string
    descuento: number
    observaciones: string | null
    createdAt: Date
    updatedAt: Date
    _count: TransaccionCountAggregateOutputType | null
    _avg: TransaccionAvgAggregateOutputType | null
    _sum: TransaccionSumAggregateOutputType | null
    _min: TransaccionMinAggregateOutputType | null
    _max: TransaccionMaxAggregateOutputType | null
  }

  type GetTransaccionGroupByPayload<T extends TransaccionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransaccionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransaccionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransaccionGroupByOutputType[P]>
            : GetScalarType<T[P], TransaccionGroupByOutputType[P]>
        }
      >
    >


  export type TransaccionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipoTransaccion?: boolean
    nroDocumento?: boolean
    fecha?: boolean
    nitCi?: boolean
    razonSocial?: boolean
    formaPago?: boolean
    descuento?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    detalles?: boolean | Transaccion$detallesArgs<ExtArgs>
    pagos?: boolean | Transaccion$pagosArgs<ExtArgs>
    deudaCredito?: boolean | Transaccion$deudaCreditoArgs<ExtArgs>
    _count?: boolean | TransaccionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaccion"]>

  export type TransaccionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipoTransaccion?: boolean
    nroDocumento?: boolean
    fecha?: boolean
    nitCi?: boolean
    razonSocial?: boolean
    formaPago?: boolean
    descuento?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["transaccion"]>

  export type TransaccionSelectScalar = {
    id?: boolean
    tipoTransaccion?: boolean
    nroDocumento?: boolean
    fecha?: boolean
    nitCi?: boolean
    razonSocial?: boolean
    formaPago?: boolean
    descuento?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TransaccionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detalles?: boolean | Transaccion$detallesArgs<ExtArgs>
    pagos?: boolean | Transaccion$pagosArgs<ExtArgs>
    deudaCredito?: boolean | Transaccion$deudaCreditoArgs<ExtArgs>
    _count?: boolean | TransaccionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TransaccionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TransaccionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaccion"
    objects: {
      detalles: Prisma.$DetalleTransaccionPayload<ExtArgs>[]
      pagos: Prisma.$PagoPayload<ExtArgs>[]
      deudaCredito: Prisma.$DeudaCreditoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tipoTransaccion: string
      nroDocumento: string
      fecha: Date
      nitCi: string
      razonSocial: string
      formaPago: string
      descuento: number
      observaciones: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["transaccion"]>
    composites: {}
  }

  type TransaccionGetPayload<S extends boolean | null | undefined | TransaccionDefaultArgs> = $Result.GetResult<Prisma.$TransaccionPayload, S>

  type TransaccionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TransaccionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TransaccionCountAggregateInputType | true
    }

  export interface TransaccionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaccion'], meta: { name: 'Transaccion' } }
    /**
     * Find zero or one Transaccion that matches the filter.
     * @param {TransaccionFindUniqueArgs} args - Arguments to find a Transaccion
     * @example
     * // Get one Transaccion
     * const transaccion = await prisma.transaccion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransaccionFindUniqueArgs>(args: SelectSubset<T, TransaccionFindUniqueArgs<ExtArgs>>): Prisma__TransaccionClient<$Result.GetResult<Prisma.$TransaccionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Transaccion that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TransaccionFindUniqueOrThrowArgs} args - Arguments to find a Transaccion
     * @example
     * // Get one Transaccion
     * const transaccion = await prisma.transaccion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransaccionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransaccionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransaccionClient<$Result.GetResult<Prisma.$TransaccionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Transaccion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransaccionFindFirstArgs} args - Arguments to find a Transaccion
     * @example
     * // Get one Transaccion
     * const transaccion = await prisma.transaccion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransaccionFindFirstArgs>(args?: SelectSubset<T, TransaccionFindFirstArgs<ExtArgs>>): Prisma__TransaccionClient<$Result.GetResult<Prisma.$TransaccionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Transaccion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransaccionFindFirstOrThrowArgs} args - Arguments to find a Transaccion
     * @example
     * // Get one Transaccion
     * const transaccion = await prisma.transaccion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransaccionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransaccionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransaccionClient<$Result.GetResult<Prisma.$TransaccionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Transaccions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransaccionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transaccions
     * const transaccions = await prisma.transaccion.findMany()
     * 
     * // Get first 10 Transaccions
     * const transaccions = await prisma.transaccion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transaccionWithIdOnly = await prisma.transaccion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransaccionFindManyArgs>(args?: SelectSubset<T, TransaccionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransaccionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Transaccion.
     * @param {TransaccionCreateArgs} args - Arguments to create a Transaccion.
     * @example
     * // Create one Transaccion
     * const Transaccion = await prisma.transaccion.create({
     *   data: {
     *     // ... data to create a Transaccion
     *   }
     * })
     * 
     */
    create<T extends TransaccionCreateArgs>(args: SelectSubset<T, TransaccionCreateArgs<ExtArgs>>): Prisma__TransaccionClient<$Result.GetResult<Prisma.$TransaccionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Transaccions.
     * @param {TransaccionCreateManyArgs} args - Arguments to create many Transaccions.
     * @example
     * // Create many Transaccions
     * const transaccion = await prisma.transaccion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransaccionCreateManyArgs>(args?: SelectSubset<T, TransaccionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transaccions and returns the data saved in the database.
     * @param {TransaccionCreateManyAndReturnArgs} args - Arguments to create many Transaccions.
     * @example
     * // Create many Transaccions
     * const transaccion = await prisma.transaccion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transaccions and only return the `id`
     * const transaccionWithIdOnly = await prisma.transaccion.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransaccionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransaccionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransaccionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Transaccion.
     * @param {TransaccionDeleteArgs} args - Arguments to delete one Transaccion.
     * @example
     * // Delete one Transaccion
     * const Transaccion = await prisma.transaccion.delete({
     *   where: {
     *     // ... filter to delete one Transaccion
     *   }
     * })
     * 
     */
    delete<T extends TransaccionDeleteArgs>(args: SelectSubset<T, TransaccionDeleteArgs<ExtArgs>>): Prisma__TransaccionClient<$Result.GetResult<Prisma.$TransaccionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Transaccion.
     * @param {TransaccionUpdateArgs} args - Arguments to update one Transaccion.
     * @example
     * // Update one Transaccion
     * const transaccion = await prisma.transaccion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransaccionUpdateArgs>(args: SelectSubset<T, TransaccionUpdateArgs<ExtArgs>>): Prisma__TransaccionClient<$Result.GetResult<Prisma.$TransaccionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Transaccions.
     * @param {TransaccionDeleteManyArgs} args - Arguments to filter Transaccions to delete.
     * @example
     * // Delete a few Transaccions
     * const { count } = await prisma.transaccion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransaccionDeleteManyArgs>(args?: SelectSubset<T, TransaccionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transaccions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransaccionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transaccions
     * const transaccion = await prisma.transaccion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransaccionUpdateManyArgs>(args: SelectSubset<T, TransaccionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Transaccion.
     * @param {TransaccionUpsertArgs} args - Arguments to update or create a Transaccion.
     * @example
     * // Update or create a Transaccion
     * const transaccion = await prisma.transaccion.upsert({
     *   create: {
     *     // ... data to create a Transaccion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaccion we want to update
     *   }
     * })
     */
    upsert<T extends TransaccionUpsertArgs>(args: SelectSubset<T, TransaccionUpsertArgs<ExtArgs>>): Prisma__TransaccionClient<$Result.GetResult<Prisma.$TransaccionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Transaccions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransaccionCountArgs} args - Arguments to filter Transaccions to count.
     * @example
     * // Count the number of Transaccions
     * const count = await prisma.transaccion.count({
     *   where: {
     *     // ... the filter for the Transaccions we want to count
     *   }
     * })
    **/
    count<T extends TransaccionCountArgs>(
      args?: Subset<T, TransaccionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransaccionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaccion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransaccionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransaccionAggregateArgs>(args: Subset<T, TransaccionAggregateArgs>): Prisma.PrismaPromise<GetTransaccionAggregateType<T>>

    /**
     * Group by Transaccion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransaccionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransaccionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransaccionGroupByArgs['orderBy'] }
        : { orderBy?: TransaccionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransaccionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransaccionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaccion model
   */
  readonly fields: TransaccionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaccion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransaccionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    detalles<T extends Transaccion$detallesArgs<ExtArgs> = {}>(args?: Subset<T, Transaccion$detallesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DetalleTransaccionPayload<ExtArgs>, T, "findMany"> | Null>
    pagos<T extends Transaccion$pagosArgs<ExtArgs> = {}>(args?: Subset<T, Transaccion$pagosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findMany"> | Null>
    deudaCredito<T extends Transaccion$deudaCreditoArgs<ExtArgs> = {}>(args?: Subset<T, Transaccion$deudaCreditoArgs<ExtArgs>>): Prisma__DeudaCreditoClient<$Result.GetResult<Prisma.$DeudaCreditoPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaccion model
   */ 
  interface TransaccionFieldRefs {
    readonly id: FieldRef<"Transaccion", 'String'>
    readonly tipoTransaccion: FieldRef<"Transaccion", 'String'>
    readonly nroDocumento: FieldRef<"Transaccion", 'String'>
    readonly fecha: FieldRef<"Transaccion", 'DateTime'>
    readonly nitCi: FieldRef<"Transaccion", 'String'>
    readonly razonSocial: FieldRef<"Transaccion", 'String'>
    readonly formaPago: FieldRef<"Transaccion", 'String'>
    readonly descuento: FieldRef<"Transaccion", 'Float'>
    readonly observaciones: FieldRef<"Transaccion", 'String'>
    readonly createdAt: FieldRef<"Transaccion", 'DateTime'>
    readonly updatedAt: FieldRef<"Transaccion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaccion findUnique
   */
  export type TransaccionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaccion
     */
    select?: TransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransaccionInclude<ExtArgs> | null
    /**
     * Filter, which Transaccion to fetch.
     */
    where: TransaccionWhereUniqueInput
  }

  /**
   * Transaccion findUniqueOrThrow
   */
  export type TransaccionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaccion
     */
    select?: TransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransaccionInclude<ExtArgs> | null
    /**
     * Filter, which Transaccion to fetch.
     */
    where: TransaccionWhereUniqueInput
  }

  /**
   * Transaccion findFirst
   */
  export type TransaccionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaccion
     */
    select?: TransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransaccionInclude<ExtArgs> | null
    /**
     * Filter, which Transaccion to fetch.
     */
    where?: TransaccionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transaccions to fetch.
     */
    orderBy?: TransaccionOrderByWithRelationInput | TransaccionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transaccions.
     */
    cursor?: TransaccionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transaccions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transaccions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transaccions.
     */
    distinct?: TransaccionScalarFieldEnum | TransaccionScalarFieldEnum[]
  }

  /**
   * Transaccion findFirstOrThrow
   */
  export type TransaccionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaccion
     */
    select?: TransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransaccionInclude<ExtArgs> | null
    /**
     * Filter, which Transaccion to fetch.
     */
    where?: TransaccionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transaccions to fetch.
     */
    orderBy?: TransaccionOrderByWithRelationInput | TransaccionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transaccions.
     */
    cursor?: TransaccionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transaccions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transaccions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transaccions.
     */
    distinct?: TransaccionScalarFieldEnum | TransaccionScalarFieldEnum[]
  }

  /**
   * Transaccion findMany
   */
  export type TransaccionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaccion
     */
    select?: TransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransaccionInclude<ExtArgs> | null
    /**
     * Filter, which Transaccions to fetch.
     */
    where?: TransaccionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transaccions to fetch.
     */
    orderBy?: TransaccionOrderByWithRelationInput | TransaccionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transaccions.
     */
    cursor?: TransaccionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transaccions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transaccions.
     */
    skip?: number
    distinct?: TransaccionScalarFieldEnum | TransaccionScalarFieldEnum[]
  }

  /**
   * Transaccion create
   */
  export type TransaccionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaccion
     */
    select?: TransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransaccionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaccion.
     */
    data: XOR<TransaccionCreateInput, TransaccionUncheckedCreateInput>
  }

  /**
   * Transaccion createMany
   */
  export type TransaccionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transaccions.
     */
    data: TransaccionCreateManyInput | TransaccionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaccion createManyAndReturn
   */
  export type TransaccionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaccion
     */
    select?: TransaccionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Transaccions.
     */
    data: TransaccionCreateManyInput | TransaccionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaccion update
   */
  export type TransaccionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaccion
     */
    select?: TransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransaccionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaccion.
     */
    data: XOR<TransaccionUpdateInput, TransaccionUncheckedUpdateInput>
    /**
     * Choose, which Transaccion to update.
     */
    where: TransaccionWhereUniqueInput
  }

  /**
   * Transaccion updateMany
   */
  export type TransaccionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transaccions.
     */
    data: XOR<TransaccionUpdateManyMutationInput, TransaccionUncheckedUpdateManyInput>
    /**
     * Filter which Transaccions to update
     */
    where?: TransaccionWhereInput
  }

  /**
   * Transaccion upsert
   */
  export type TransaccionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaccion
     */
    select?: TransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransaccionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaccion to update in case it exists.
     */
    where: TransaccionWhereUniqueInput
    /**
     * In case the Transaccion found by the `where` argument doesn't exist, create a new Transaccion with this data.
     */
    create: XOR<TransaccionCreateInput, TransaccionUncheckedCreateInput>
    /**
     * In case the Transaccion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransaccionUpdateInput, TransaccionUncheckedUpdateInput>
  }

  /**
   * Transaccion delete
   */
  export type TransaccionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaccion
     */
    select?: TransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransaccionInclude<ExtArgs> | null
    /**
     * Filter which Transaccion to delete.
     */
    where: TransaccionWhereUniqueInput
  }

  /**
   * Transaccion deleteMany
   */
  export type TransaccionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaccions to delete
     */
    where?: TransaccionWhereInput
  }

  /**
   * Transaccion.detalles
   */
  export type Transaccion$detallesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleTransaccion
     */
    select?: DetalleTransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleTransaccionInclude<ExtArgs> | null
    where?: DetalleTransaccionWhereInput
    orderBy?: DetalleTransaccionOrderByWithRelationInput | DetalleTransaccionOrderByWithRelationInput[]
    cursor?: DetalleTransaccionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DetalleTransaccionScalarFieldEnum | DetalleTransaccionScalarFieldEnum[]
  }

  /**
   * Transaccion.pagos
   */
  export type Transaccion$pagosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    where?: PagoWhereInput
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    cursor?: PagoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Transaccion.deudaCredito
   */
  export type Transaccion$deudaCreditoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeudaCredito
     */
    select?: DeudaCreditoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeudaCreditoInclude<ExtArgs> | null
    where?: DeudaCreditoWhereInput
  }

  /**
   * Transaccion without action
   */
  export type TransaccionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaccion
     */
    select?: TransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransaccionInclude<ExtArgs> | null
  }


  /**
   * Model DetalleTransaccion
   */

  export type AggregateDetalleTransaccion = {
    _count: DetalleTransaccionCountAggregateOutputType | null
    _avg: DetalleTransaccionAvgAggregateOutputType | null
    _sum: DetalleTransaccionSumAggregateOutputType | null
    _min: DetalleTransaccionMinAggregateOutputType | null
    _max: DetalleTransaccionMaxAggregateOutputType | null
  }

  export type DetalleTransaccionAvgAggregateOutputType = {
    cantidad: number | null
    precioUnitario: number | null
    subtotal: number | null
  }

  export type DetalleTransaccionSumAggregateOutputType = {
    cantidad: number | null
    precioUnitario: number | null
    subtotal: number | null
  }

  export type DetalleTransaccionMinAggregateOutputType = {
    id: string | null
    transaccionId: string | null
    productoCodigo: string | null
    cantidad: number | null
    precioUnitario: number | null
    subtotal: number | null
  }

  export type DetalleTransaccionMaxAggregateOutputType = {
    id: string | null
    transaccionId: string | null
    productoCodigo: string | null
    cantidad: number | null
    precioUnitario: number | null
    subtotal: number | null
  }

  export type DetalleTransaccionCountAggregateOutputType = {
    id: number
    transaccionId: number
    productoCodigo: number
    cantidad: number
    precioUnitario: number
    subtotal: number
    _all: number
  }


  export type DetalleTransaccionAvgAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type DetalleTransaccionSumAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type DetalleTransaccionMinAggregateInputType = {
    id?: true
    transaccionId?: true
    productoCodigo?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type DetalleTransaccionMaxAggregateInputType = {
    id?: true
    transaccionId?: true
    productoCodigo?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type DetalleTransaccionCountAggregateInputType = {
    id?: true
    transaccionId?: true
    productoCodigo?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
    _all?: true
  }

  export type DetalleTransaccionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DetalleTransaccion to aggregate.
     */
    where?: DetalleTransaccionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DetalleTransaccions to fetch.
     */
    orderBy?: DetalleTransaccionOrderByWithRelationInput | DetalleTransaccionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DetalleTransaccionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DetalleTransaccions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DetalleTransaccions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DetalleTransaccions
    **/
    _count?: true | DetalleTransaccionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DetalleTransaccionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DetalleTransaccionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DetalleTransaccionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DetalleTransaccionMaxAggregateInputType
  }

  export type GetDetalleTransaccionAggregateType<T extends DetalleTransaccionAggregateArgs> = {
        [P in keyof T & keyof AggregateDetalleTransaccion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDetalleTransaccion[P]>
      : GetScalarType<T[P], AggregateDetalleTransaccion[P]>
  }




  export type DetalleTransaccionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DetalleTransaccionWhereInput
    orderBy?: DetalleTransaccionOrderByWithAggregationInput | DetalleTransaccionOrderByWithAggregationInput[]
    by: DetalleTransaccionScalarFieldEnum[] | DetalleTransaccionScalarFieldEnum
    having?: DetalleTransaccionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DetalleTransaccionCountAggregateInputType | true
    _avg?: DetalleTransaccionAvgAggregateInputType
    _sum?: DetalleTransaccionSumAggregateInputType
    _min?: DetalleTransaccionMinAggregateInputType
    _max?: DetalleTransaccionMaxAggregateInputType
  }

  export type DetalleTransaccionGroupByOutputType = {
    id: string
    transaccionId: string
    productoCodigo: string
    cantidad: number
    precioUnitario: number
    subtotal: number
    _count: DetalleTransaccionCountAggregateOutputType | null
    _avg: DetalleTransaccionAvgAggregateOutputType | null
    _sum: DetalleTransaccionSumAggregateOutputType | null
    _min: DetalleTransaccionMinAggregateOutputType | null
    _max: DetalleTransaccionMaxAggregateOutputType | null
  }

  type GetDetalleTransaccionGroupByPayload<T extends DetalleTransaccionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DetalleTransaccionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DetalleTransaccionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DetalleTransaccionGroupByOutputType[P]>
            : GetScalarType<T[P], DetalleTransaccionGroupByOutputType[P]>
        }
      >
    >


  export type DetalleTransaccionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transaccionId?: boolean
    productoCodigo?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
    transaccion?: boolean | TransaccionDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["detalleTransaccion"]>

  export type DetalleTransaccionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transaccionId?: boolean
    productoCodigo?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
    transaccion?: boolean | TransaccionDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["detalleTransaccion"]>

  export type DetalleTransaccionSelectScalar = {
    id?: boolean
    transaccionId?: boolean
    productoCodigo?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
  }

  export type DetalleTransaccionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaccion?: boolean | TransaccionDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }
  export type DetalleTransaccionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaccion?: boolean | TransaccionDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }

  export type $DetalleTransaccionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DetalleTransaccion"
    objects: {
      transaccion: Prisma.$TransaccionPayload<ExtArgs>
      producto: Prisma.$ProductoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      transaccionId: string
      productoCodigo: string
      cantidad: number
      precioUnitario: number
      subtotal: number
    }, ExtArgs["result"]["detalleTransaccion"]>
    composites: {}
  }

  type DetalleTransaccionGetPayload<S extends boolean | null | undefined | DetalleTransaccionDefaultArgs> = $Result.GetResult<Prisma.$DetalleTransaccionPayload, S>

  type DetalleTransaccionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DetalleTransaccionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DetalleTransaccionCountAggregateInputType | true
    }

  export interface DetalleTransaccionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DetalleTransaccion'], meta: { name: 'DetalleTransaccion' } }
    /**
     * Find zero or one DetalleTransaccion that matches the filter.
     * @param {DetalleTransaccionFindUniqueArgs} args - Arguments to find a DetalleTransaccion
     * @example
     * // Get one DetalleTransaccion
     * const detalleTransaccion = await prisma.detalleTransaccion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DetalleTransaccionFindUniqueArgs>(args: SelectSubset<T, DetalleTransaccionFindUniqueArgs<ExtArgs>>): Prisma__DetalleTransaccionClient<$Result.GetResult<Prisma.$DetalleTransaccionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DetalleTransaccion that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DetalleTransaccionFindUniqueOrThrowArgs} args - Arguments to find a DetalleTransaccion
     * @example
     * // Get one DetalleTransaccion
     * const detalleTransaccion = await prisma.detalleTransaccion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DetalleTransaccionFindUniqueOrThrowArgs>(args: SelectSubset<T, DetalleTransaccionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DetalleTransaccionClient<$Result.GetResult<Prisma.$DetalleTransaccionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DetalleTransaccion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleTransaccionFindFirstArgs} args - Arguments to find a DetalleTransaccion
     * @example
     * // Get one DetalleTransaccion
     * const detalleTransaccion = await prisma.detalleTransaccion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DetalleTransaccionFindFirstArgs>(args?: SelectSubset<T, DetalleTransaccionFindFirstArgs<ExtArgs>>): Prisma__DetalleTransaccionClient<$Result.GetResult<Prisma.$DetalleTransaccionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DetalleTransaccion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleTransaccionFindFirstOrThrowArgs} args - Arguments to find a DetalleTransaccion
     * @example
     * // Get one DetalleTransaccion
     * const detalleTransaccion = await prisma.detalleTransaccion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DetalleTransaccionFindFirstOrThrowArgs>(args?: SelectSubset<T, DetalleTransaccionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DetalleTransaccionClient<$Result.GetResult<Prisma.$DetalleTransaccionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DetalleTransaccions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleTransaccionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DetalleTransaccions
     * const detalleTransaccions = await prisma.detalleTransaccion.findMany()
     * 
     * // Get first 10 DetalleTransaccions
     * const detalleTransaccions = await prisma.detalleTransaccion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const detalleTransaccionWithIdOnly = await prisma.detalleTransaccion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DetalleTransaccionFindManyArgs>(args?: SelectSubset<T, DetalleTransaccionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DetalleTransaccionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DetalleTransaccion.
     * @param {DetalleTransaccionCreateArgs} args - Arguments to create a DetalleTransaccion.
     * @example
     * // Create one DetalleTransaccion
     * const DetalleTransaccion = await prisma.detalleTransaccion.create({
     *   data: {
     *     // ... data to create a DetalleTransaccion
     *   }
     * })
     * 
     */
    create<T extends DetalleTransaccionCreateArgs>(args: SelectSubset<T, DetalleTransaccionCreateArgs<ExtArgs>>): Prisma__DetalleTransaccionClient<$Result.GetResult<Prisma.$DetalleTransaccionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DetalleTransaccions.
     * @param {DetalleTransaccionCreateManyArgs} args - Arguments to create many DetalleTransaccions.
     * @example
     * // Create many DetalleTransaccions
     * const detalleTransaccion = await prisma.detalleTransaccion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DetalleTransaccionCreateManyArgs>(args?: SelectSubset<T, DetalleTransaccionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DetalleTransaccions and returns the data saved in the database.
     * @param {DetalleTransaccionCreateManyAndReturnArgs} args - Arguments to create many DetalleTransaccions.
     * @example
     * // Create many DetalleTransaccions
     * const detalleTransaccion = await prisma.detalleTransaccion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DetalleTransaccions and only return the `id`
     * const detalleTransaccionWithIdOnly = await prisma.detalleTransaccion.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DetalleTransaccionCreateManyAndReturnArgs>(args?: SelectSubset<T, DetalleTransaccionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DetalleTransaccionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DetalleTransaccion.
     * @param {DetalleTransaccionDeleteArgs} args - Arguments to delete one DetalleTransaccion.
     * @example
     * // Delete one DetalleTransaccion
     * const DetalleTransaccion = await prisma.detalleTransaccion.delete({
     *   where: {
     *     // ... filter to delete one DetalleTransaccion
     *   }
     * })
     * 
     */
    delete<T extends DetalleTransaccionDeleteArgs>(args: SelectSubset<T, DetalleTransaccionDeleteArgs<ExtArgs>>): Prisma__DetalleTransaccionClient<$Result.GetResult<Prisma.$DetalleTransaccionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DetalleTransaccion.
     * @param {DetalleTransaccionUpdateArgs} args - Arguments to update one DetalleTransaccion.
     * @example
     * // Update one DetalleTransaccion
     * const detalleTransaccion = await prisma.detalleTransaccion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DetalleTransaccionUpdateArgs>(args: SelectSubset<T, DetalleTransaccionUpdateArgs<ExtArgs>>): Prisma__DetalleTransaccionClient<$Result.GetResult<Prisma.$DetalleTransaccionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DetalleTransaccions.
     * @param {DetalleTransaccionDeleteManyArgs} args - Arguments to filter DetalleTransaccions to delete.
     * @example
     * // Delete a few DetalleTransaccions
     * const { count } = await prisma.detalleTransaccion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DetalleTransaccionDeleteManyArgs>(args?: SelectSubset<T, DetalleTransaccionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DetalleTransaccions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleTransaccionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DetalleTransaccions
     * const detalleTransaccion = await prisma.detalleTransaccion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DetalleTransaccionUpdateManyArgs>(args: SelectSubset<T, DetalleTransaccionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DetalleTransaccion.
     * @param {DetalleTransaccionUpsertArgs} args - Arguments to update or create a DetalleTransaccion.
     * @example
     * // Update or create a DetalleTransaccion
     * const detalleTransaccion = await prisma.detalleTransaccion.upsert({
     *   create: {
     *     // ... data to create a DetalleTransaccion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DetalleTransaccion we want to update
     *   }
     * })
     */
    upsert<T extends DetalleTransaccionUpsertArgs>(args: SelectSubset<T, DetalleTransaccionUpsertArgs<ExtArgs>>): Prisma__DetalleTransaccionClient<$Result.GetResult<Prisma.$DetalleTransaccionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DetalleTransaccions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleTransaccionCountArgs} args - Arguments to filter DetalleTransaccions to count.
     * @example
     * // Count the number of DetalleTransaccions
     * const count = await prisma.detalleTransaccion.count({
     *   where: {
     *     // ... the filter for the DetalleTransaccions we want to count
     *   }
     * })
    **/
    count<T extends DetalleTransaccionCountArgs>(
      args?: Subset<T, DetalleTransaccionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DetalleTransaccionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DetalleTransaccion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleTransaccionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DetalleTransaccionAggregateArgs>(args: Subset<T, DetalleTransaccionAggregateArgs>): Prisma.PrismaPromise<GetDetalleTransaccionAggregateType<T>>

    /**
     * Group by DetalleTransaccion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleTransaccionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DetalleTransaccionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DetalleTransaccionGroupByArgs['orderBy'] }
        : { orderBy?: DetalleTransaccionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DetalleTransaccionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDetalleTransaccionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DetalleTransaccion model
   */
  readonly fields: DetalleTransaccionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DetalleTransaccion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DetalleTransaccionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transaccion<T extends TransaccionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TransaccionDefaultArgs<ExtArgs>>): Prisma__TransaccionClient<$Result.GetResult<Prisma.$TransaccionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    producto<T extends ProductoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductoDefaultArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DetalleTransaccion model
   */ 
  interface DetalleTransaccionFieldRefs {
    readonly id: FieldRef<"DetalleTransaccion", 'String'>
    readonly transaccionId: FieldRef<"DetalleTransaccion", 'String'>
    readonly productoCodigo: FieldRef<"DetalleTransaccion", 'String'>
    readonly cantidad: FieldRef<"DetalleTransaccion", 'Int'>
    readonly precioUnitario: FieldRef<"DetalleTransaccion", 'Float'>
    readonly subtotal: FieldRef<"DetalleTransaccion", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * DetalleTransaccion findUnique
   */
  export type DetalleTransaccionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleTransaccion
     */
    select?: DetalleTransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleTransaccionInclude<ExtArgs> | null
    /**
     * Filter, which DetalleTransaccion to fetch.
     */
    where: DetalleTransaccionWhereUniqueInput
  }

  /**
   * DetalleTransaccion findUniqueOrThrow
   */
  export type DetalleTransaccionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleTransaccion
     */
    select?: DetalleTransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleTransaccionInclude<ExtArgs> | null
    /**
     * Filter, which DetalleTransaccion to fetch.
     */
    where: DetalleTransaccionWhereUniqueInput
  }

  /**
   * DetalleTransaccion findFirst
   */
  export type DetalleTransaccionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleTransaccion
     */
    select?: DetalleTransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleTransaccionInclude<ExtArgs> | null
    /**
     * Filter, which DetalleTransaccion to fetch.
     */
    where?: DetalleTransaccionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DetalleTransaccions to fetch.
     */
    orderBy?: DetalleTransaccionOrderByWithRelationInput | DetalleTransaccionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DetalleTransaccions.
     */
    cursor?: DetalleTransaccionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DetalleTransaccions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DetalleTransaccions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DetalleTransaccions.
     */
    distinct?: DetalleTransaccionScalarFieldEnum | DetalleTransaccionScalarFieldEnum[]
  }

  /**
   * DetalleTransaccion findFirstOrThrow
   */
  export type DetalleTransaccionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleTransaccion
     */
    select?: DetalleTransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleTransaccionInclude<ExtArgs> | null
    /**
     * Filter, which DetalleTransaccion to fetch.
     */
    where?: DetalleTransaccionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DetalleTransaccions to fetch.
     */
    orderBy?: DetalleTransaccionOrderByWithRelationInput | DetalleTransaccionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DetalleTransaccions.
     */
    cursor?: DetalleTransaccionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DetalleTransaccions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DetalleTransaccions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DetalleTransaccions.
     */
    distinct?: DetalleTransaccionScalarFieldEnum | DetalleTransaccionScalarFieldEnum[]
  }

  /**
   * DetalleTransaccion findMany
   */
  export type DetalleTransaccionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleTransaccion
     */
    select?: DetalleTransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleTransaccionInclude<ExtArgs> | null
    /**
     * Filter, which DetalleTransaccions to fetch.
     */
    where?: DetalleTransaccionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DetalleTransaccions to fetch.
     */
    orderBy?: DetalleTransaccionOrderByWithRelationInput | DetalleTransaccionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DetalleTransaccions.
     */
    cursor?: DetalleTransaccionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DetalleTransaccions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DetalleTransaccions.
     */
    skip?: number
    distinct?: DetalleTransaccionScalarFieldEnum | DetalleTransaccionScalarFieldEnum[]
  }

  /**
   * DetalleTransaccion create
   */
  export type DetalleTransaccionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleTransaccion
     */
    select?: DetalleTransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleTransaccionInclude<ExtArgs> | null
    /**
     * The data needed to create a DetalleTransaccion.
     */
    data: XOR<DetalleTransaccionCreateInput, DetalleTransaccionUncheckedCreateInput>
  }

  /**
   * DetalleTransaccion createMany
   */
  export type DetalleTransaccionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DetalleTransaccions.
     */
    data: DetalleTransaccionCreateManyInput | DetalleTransaccionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DetalleTransaccion createManyAndReturn
   */
  export type DetalleTransaccionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleTransaccion
     */
    select?: DetalleTransaccionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DetalleTransaccions.
     */
    data: DetalleTransaccionCreateManyInput | DetalleTransaccionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleTransaccionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DetalleTransaccion update
   */
  export type DetalleTransaccionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleTransaccion
     */
    select?: DetalleTransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleTransaccionInclude<ExtArgs> | null
    /**
     * The data needed to update a DetalleTransaccion.
     */
    data: XOR<DetalleTransaccionUpdateInput, DetalleTransaccionUncheckedUpdateInput>
    /**
     * Choose, which DetalleTransaccion to update.
     */
    where: DetalleTransaccionWhereUniqueInput
  }

  /**
   * DetalleTransaccion updateMany
   */
  export type DetalleTransaccionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DetalleTransaccions.
     */
    data: XOR<DetalleTransaccionUpdateManyMutationInput, DetalleTransaccionUncheckedUpdateManyInput>
    /**
     * Filter which DetalleTransaccions to update
     */
    where?: DetalleTransaccionWhereInput
  }

  /**
   * DetalleTransaccion upsert
   */
  export type DetalleTransaccionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleTransaccion
     */
    select?: DetalleTransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleTransaccionInclude<ExtArgs> | null
    /**
     * The filter to search for the DetalleTransaccion to update in case it exists.
     */
    where: DetalleTransaccionWhereUniqueInput
    /**
     * In case the DetalleTransaccion found by the `where` argument doesn't exist, create a new DetalleTransaccion with this data.
     */
    create: XOR<DetalleTransaccionCreateInput, DetalleTransaccionUncheckedCreateInput>
    /**
     * In case the DetalleTransaccion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DetalleTransaccionUpdateInput, DetalleTransaccionUncheckedUpdateInput>
  }

  /**
   * DetalleTransaccion delete
   */
  export type DetalleTransaccionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleTransaccion
     */
    select?: DetalleTransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleTransaccionInclude<ExtArgs> | null
    /**
     * Filter which DetalleTransaccion to delete.
     */
    where: DetalleTransaccionWhereUniqueInput
  }

  /**
   * DetalleTransaccion deleteMany
   */
  export type DetalleTransaccionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DetalleTransaccions to delete
     */
    where?: DetalleTransaccionWhereInput
  }

  /**
   * DetalleTransaccion without action
   */
  export type DetalleTransaccionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleTransaccion
     */
    select?: DetalleTransaccionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleTransaccionInclude<ExtArgs> | null
  }


  /**
   * Model Pago
   */

  export type AggregatePago = {
    _count: PagoCountAggregateOutputType | null
    _avg: PagoAvgAggregateOutputType | null
    _sum: PagoSumAggregateOutputType | null
    _min: PagoMinAggregateOutputType | null
    _max: PagoMaxAggregateOutputType | null
  }

  export type PagoAvgAggregateOutputType = {
    monto: number | null
  }

  export type PagoSumAggregateOutputType = {
    monto: number | null
  }

  export type PagoMinAggregateOutputType = {
    id: string | null
    transaccionId: string | null
    monto: number | null
    fecha: Date | null
    observaciones: string | null
  }

  export type PagoMaxAggregateOutputType = {
    id: string | null
    transaccionId: string | null
    monto: number | null
    fecha: Date | null
    observaciones: string | null
  }

  export type PagoCountAggregateOutputType = {
    id: number
    transaccionId: number
    monto: number
    fecha: number
    observaciones: number
    _all: number
  }


  export type PagoAvgAggregateInputType = {
    monto?: true
  }

  export type PagoSumAggregateInputType = {
    monto?: true
  }

  export type PagoMinAggregateInputType = {
    id?: true
    transaccionId?: true
    monto?: true
    fecha?: true
    observaciones?: true
  }

  export type PagoMaxAggregateInputType = {
    id?: true
    transaccionId?: true
    monto?: true
    fecha?: true
    observaciones?: true
  }

  export type PagoCountAggregateInputType = {
    id?: true
    transaccionId?: true
    monto?: true
    fecha?: true
    observaciones?: true
    _all?: true
  }

  export type PagoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pago to aggregate.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pagos
    **/
    _count?: true | PagoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PagoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PagoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PagoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PagoMaxAggregateInputType
  }

  export type GetPagoAggregateType<T extends PagoAggregateArgs> = {
        [P in keyof T & keyof AggregatePago]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePago[P]>
      : GetScalarType<T[P], AggregatePago[P]>
  }




  export type PagoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagoWhereInput
    orderBy?: PagoOrderByWithAggregationInput | PagoOrderByWithAggregationInput[]
    by: PagoScalarFieldEnum[] | PagoScalarFieldEnum
    having?: PagoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PagoCountAggregateInputType | true
    _avg?: PagoAvgAggregateInputType
    _sum?: PagoSumAggregateInputType
    _min?: PagoMinAggregateInputType
    _max?: PagoMaxAggregateInputType
  }

  export type PagoGroupByOutputType = {
    id: string
    transaccionId: string
    monto: number
    fecha: Date
    observaciones: string | null
    _count: PagoCountAggregateOutputType | null
    _avg: PagoAvgAggregateOutputType | null
    _sum: PagoSumAggregateOutputType | null
    _min: PagoMinAggregateOutputType | null
    _max: PagoMaxAggregateOutputType | null
  }

  type GetPagoGroupByPayload<T extends PagoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PagoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PagoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PagoGroupByOutputType[P]>
            : GetScalarType<T[P], PagoGroupByOutputType[P]>
        }
      >
    >


  export type PagoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transaccionId?: boolean
    monto?: boolean
    fecha?: boolean
    observaciones?: boolean
    transaccion?: boolean | TransaccionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pago"]>

  export type PagoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transaccionId?: boolean
    monto?: boolean
    fecha?: boolean
    observaciones?: boolean
    transaccion?: boolean | TransaccionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pago"]>

  export type PagoSelectScalar = {
    id?: boolean
    transaccionId?: boolean
    monto?: boolean
    fecha?: boolean
    observaciones?: boolean
  }

  export type PagoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaccion?: boolean | TransaccionDefaultArgs<ExtArgs>
  }
  export type PagoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaccion?: boolean | TransaccionDefaultArgs<ExtArgs>
  }

  export type $PagoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pago"
    objects: {
      transaccion: Prisma.$TransaccionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      transaccionId: string
      monto: number
      fecha: Date
      observaciones: string | null
    }, ExtArgs["result"]["pago"]>
    composites: {}
  }

  type PagoGetPayload<S extends boolean | null | undefined | PagoDefaultArgs> = $Result.GetResult<Prisma.$PagoPayload, S>

  type PagoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PagoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PagoCountAggregateInputType | true
    }

  export interface PagoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pago'], meta: { name: 'Pago' } }
    /**
     * Find zero or one Pago that matches the filter.
     * @param {PagoFindUniqueArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PagoFindUniqueArgs>(args: SelectSubset<T, PagoFindUniqueArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Pago that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PagoFindUniqueOrThrowArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PagoFindUniqueOrThrowArgs>(args: SelectSubset<T, PagoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Pago that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindFirstArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PagoFindFirstArgs>(args?: SelectSubset<T, PagoFindFirstArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Pago that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindFirstOrThrowArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PagoFindFirstOrThrowArgs>(args?: SelectSubset<T, PagoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Pagos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pagos
     * const pagos = await prisma.pago.findMany()
     * 
     * // Get first 10 Pagos
     * const pagos = await prisma.pago.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pagoWithIdOnly = await prisma.pago.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PagoFindManyArgs>(args?: SelectSubset<T, PagoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Pago.
     * @param {PagoCreateArgs} args - Arguments to create a Pago.
     * @example
     * // Create one Pago
     * const Pago = await prisma.pago.create({
     *   data: {
     *     // ... data to create a Pago
     *   }
     * })
     * 
     */
    create<T extends PagoCreateArgs>(args: SelectSubset<T, PagoCreateArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Pagos.
     * @param {PagoCreateManyArgs} args - Arguments to create many Pagos.
     * @example
     * // Create many Pagos
     * const pago = await prisma.pago.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PagoCreateManyArgs>(args?: SelectSubset<T, PagoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pagos and returns the data saved in the database.
     * @param {PagoCreateManyAndReturnArgs} args - Arguments to create many Pagos.
     * @example
     * // Create many Pagos
     * const pago = await prisma.pago.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pagos and only return the `id`
     * const pagoWithIdOnly = await prisma.pago.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PagoCreateManyAndReturnArgs>(args?: SelectSubset<T, PagoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Pago.
     * @param {PagoDeleteArgs} args - Arguments to delete one Pago.
     * @example
     * // Delete one Pago
     * const Pago = await prisma.pago.delete({
     *   where: {
     *     // ... filter to delete one Pago
     *   }
     * })
     * 
     */
    delete<T extends PagoDeleteArgs>(args: SelectSubset<T, PagoDeleteArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Pago.
     * @param {PagoUpdateArgs} args - Arguments to update one Pago.
     * @example
     * // Update one Pago
     * const pago = await prisma.pago.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PagoUpdateArgs>(args: SelectSubset<T, PagoUpdateArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Pagos.
     * @param {PagoDeleteManyArgs} args - Arguments to filter Pagos to delete.
     * @example
     * // Delete a few Pagos
     * const { count } = await prisma.pago.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PagoDeleteManyArgs>(args?: SelectSubset<T, PagoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pagos
     * const pago = await prisma.pago.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PagoUpdateManyArgs>(args: SelectSubset<T, PagoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pago.
     * @param {PagoUpsertArgs} args - Arguments to update or create a Pago.
     * @example
     * // Update or create a Pago
     * const pago = await prisma.pago.upsert({
     *   create: {
     *     // ... data to create a Pago
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pago we want to update
     *   }
     * })
     */
    upsert<T extends PagoUpsertArgs>(args: SelectSubset<T, PagoUpsertArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoCountArgs} args - Arguments to filter Pagos to count.
     * @example
     * // Count the number of Pagos
     * const count = await prisma.pago.count({
     *   where: {
     *     // ... the filter for the Pagos we want to count
     *   }
     * })
    **/
    count<T extends PagoCountArgs>(
      args?: Subset<T, PagoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PagoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pago.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PagoAggregateArgs>(args: Subset<T, PagoAggregateArgs>): Prisma.PrismaPromise<GetPagoAggregateType<T>>

    /**
     * Group by Pago.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PagoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PagoGroupByArgs['orderBy'] }
        : { orderBy?: PagoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PagoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPagoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pago model
   */
  readonly fields: PagoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pago.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PagoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transaccion<T extends TransaccionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TransaccionDefaultArgs<ExtArgs>>): Prisma__TransaccionClient<$Result.GetResult<Prisma.$TransaccionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pago model
   */ 
  interface PagoFieldRefs {
    readonly id: FieldRef<"Pago", 'String'>
    readonly transaccionId: FieldRef<"Pago", 'String'>
    readonly monto: FieldRef<"Pago", 'Float'>
    readonly fecha: FieldRef<"Pago", 'DateTime'>
    readonly observaciones: FieldRef<"Pago", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Pago findUnique
   */
  export type PagoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago findUniqueOrThrow
   */
  export type PagoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago findFirst
   */
  export type PagoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagos.
     */
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago findFirstOrThrow
   */
  export type PagoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagos.
     */
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago findMany
   */
  export type PagoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pagos to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago create
   */
  export type PagoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The data needed to create a Pago.
     */
    data: XOR<PagoCreateInput, PagoUncheckedCreateInput>
  }

  /**
   * Pago createMany
   */
  export type PagoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pagos.
     */
    data: PagoCreateManyInput | PagoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pago createManyAndReturn
   */
  export type PagoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Pagos.
     */
    data: PagoCreateManyInput | PagoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pago update
   */
  export type PagoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The data needed to update a Pago.
     */
    data: XOR<PagoUpdateInput, PagoUncheckedUpdateInput>
    /**
     * Choose, which Pago to update.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago updateMany
   */
  export type PagoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pagos.
     */
    data: XOR<PagoUpdateManyMutationInput, PagoUncheckedUpdateManyInput>
    /**
     * Filter which Pagos to update
     */
    where?: PagoWhereInput
  }

  /**
   * Pago upsert
   */
  export type PagoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The filter to search for the Pago to update in case it exists.
     */
    where: PagoWhereUniqueInput
    /**
     * In case the Pago found by the `where` argument doesn't exist, create a new Pago with this data.
     */
    create: XOR<PagoCreateInput, PagoUncheckedCreateInput>
    /**
     * In case the Pago was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PagoUpdateInput, PagoUncheckedUpdateInput>
  }

  /**
   * Pago delete
   */
  export type PagoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter which Pago to delete.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago deleteMany
   */
  export type PagoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pagos to delete
     */
    where?: PagoWhereInput
  }

  /**
   * Pago without action
   */
  export type PagoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
  }


  /**
   * Model DeudaCredito
   */

  export type AggregateDeudaCredito = {
    _count: DeudaCreditoCountAggregateOutputType | null
    _avg: DeudaCreditoAvgAggregateOutputType | null
    _sum: DeudaCreditoSumAggregateOutputType | null
    _min: DeudaCreditoMinAggregateOutputType | null
    _max: DeudaCreditoMaxAggregateOutputType | null
  }

  export type DeudaCreditoAvgAggregateOutputType = {
    montoTotal: number | null
    saldoPendiente: number | null
  }

  export type DeudaCreditoSumAggregateOutputType = {
    montoTotal: number | null
    saldoPendiente: number | null
  }

  export type DeudaCreditoMinAggregateOutputType = {
    id: string | null
    transaccionId: string | null
    montoTotal: number | null
    saldoPendiente: number | null
    estado: string | null
    fechaVencimiento: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeudaCreditoMaxAggregateOutputType = {
    id: string | null
    transaccionId: string | null
    montoTotal: number | null
    saldoPendiente: number | null
    estado: string | null
    fechaVencimiento: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeudaCreditoCountAggregateOutputType = {
    id: number
    transaccionId: number
    montoTotal: number
    saldoPendiente: number
    estado: number
    fechaVencimiento: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DeudaCreditoAvgAggregateInputType = {
    montoTotal?: true
    saldoPendiente?: true
  }

  export type DeudaCreditoSumAggregateInputType = {
    montoTotal?: true
    saldoPendiente?: true
  }

  export type DeudaCreditoMinAggregateInputType = {
    id?: true
    transaccionId?: true
    montoTotal?: true
    saldoPendiente?: true
    estado?: true
    fechaVencimiento?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeudaCreditoMaxAggregateInputType = {
    id?: true
    transaccionId?: true
    montoTotal?: true
    saldoPendiente?: true
    estado?: true
    fechaVencimiento?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeudaCreditoCountAggregateInputType = {
    id?: true
    transaccionId?: true
    montoTotal?: true
    saldoPendiente?: true
    estado?: true
    fechaVencimiento?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DeudaCreditoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeudaCredito to aggregate.
     */
    where?: DeudaCreditoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeudaCreditos to fetch.
     */
    orderBy?: DeudaCreditoOrderByWithRelationInput | DeudaCreditoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeudaCreditoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeudaCreditos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeudaCreditos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeudaCreditos
    **/
    _count?: true | DeudaCreditoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeudaCreditoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeudaCreditoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeudaCreditoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeudaCreditoMaxAggregateInputType
  }

  export type GetDeudaCreditoAggregateType<T extends DeudaCreditoAggregateArgs> = {
        [P in keyof T & keyof AggregateDeudaCredito]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeudaCredito[P]>
      : GetScalarType<T[P], AggregateDeudaCredito[P]>
  }




  export type DeudaCreditoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeudaCreditoWhereInput
    orderBy?: DeudaCreditoOrderByWithAggregationInput | DeudaCreditoOrderByWithAggregationInput[]
    by: DeudaCreditoScalarFieldEnum[] | DeudaCreditoScalarFieldEnum
    having?: DeudaCreditoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeudaCreditoCountAggregateInputType | true
    _avg?: DeudaCreditoAvgAggregateInputType
    _sum?: DeudaCreditoSumAggregateInputType
    _min?: DeudaCreditoMinAggregateInputType
    _max?: DeudaCreditoMaxAggregateInputType
  }

  export type DeudaCreditoGroupByOutputType = {
    id: string
    transaccionId: string
    montoTotal: number
    saldoPendiente: number
    estado: string
    fechaVencimiento: Date | null
    createdAt: Date
    updatedAt: Date
    _count: DeudaCreditoCountAggregateOutputType | null
    _avg: DeudaCreditoAvgAggregateOutputType | null
    _sum: DeudaCreditoSumAggregateOutputType | null
    _min: DeudaCreditoMinAggregateOutputType | null
    _max: DeudaCreditoMaxAggregateOutputType | null
  }

  type GetDeudaCreditoGroupByPayload<T extends DeudaCreditoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeudaCreditoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeudaCreditoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeudaCreditoGroupByOutputType[P]>
            : GetScalarType<T[P], DeudaCreditoGroupByOutputType[P]>
        }
      >
    >


  export type DeudaCreditoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transaccionId?: boolean
    montoTotal?: boolean
    saldoPendiente?: boolean
    estado?: boolean
    fechaVencimiento?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    transaccion?: boolean | TransaccionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deudaCredito"]>

  export type DeudaCreditoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transaccionId?: boolean
    montoTotal?: boolean
    saldoPendiente?: boolean
    estado?: boolean
    fechaVencimiento?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    transaccion?: boolean | TransaccionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deudaCredito"]>

  export type DeudaCreditoSelectScalar = {
    id?: boolean
    transaccionId?: boolean
    montoTotal?: boolean
    saldoPendiente?: boolean
    estado?: boolean
    fechaVencimiento?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DeudaCreditoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaccion?: boolean | TransaccionDefaultArgs<ExtArgs>
  }
  export type DeudaCreditoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaccion?: boolean | TransaccionDefaultArgs<ExtArgs>
  }

  export type $DeudaCreditoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeudaCredito"
    objects: {
      transaccion: Prisma.$TransaccionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      transaccionId: string
      montoTotal: number
      saldoPendiente: number
      estado: string
      fechaVencimiento: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["deudaCredito"]>
    composites: {}
  }

  type DeudaCreditoGetPayload<S extends boolean | null | undefined | DeudaCreditoDefaultArgs> = $Result.GetResult<Prisma.$DeudaCreditoPayload, S>

  type DeudaCreditoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DeudaCreditoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DeudaCreditoCountAggregateInputType | true
    }

  export interface DeudaCreditoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeudaCredito'], meta: { name: 'DeudaCredito' } }
    /**
     * Find zero or one DeudaCredito that matches the filter.
     * @param {DeudaCreditoFindUniqueArgs} args - Arguments to find a DeudaCredito
     * @example
     * // Get one DeudaCredito
     * const deudaCredito = await prisma.deudaCredito.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeudaCreditoFindUniqueArgs>(args: SelectSubset<T, DeudaCreditoFindUniqueArgs<ExtArgs>>): Prisma__DeudaCreditoClient<$Result.GetResult<Prisma.$DeudaCreditoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DeudaCredito that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DeudaCreditoFindUniqueOrThrowArgs} args - Arguments to find a DeudaCredito
     * @example
     * // Get one DeudaCredito
     * const deudaCredito = await prisma.deudaCredito.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeudaCreditoFindUniqueOrThrowArgs>(args: SelectSubset<T, DeudaCreditoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeudaCreditoClient<$Result.GetResult<Prisma.$DeudaCreditoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DeudaCredito that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeudaCreditoFindFirstArgs} args - Arguments to find a DeudaCredito
     * @example
     * // Get one DeudaCredito
     * const deudaCredito = await prisma.deudaCredito.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeudaCreditoFindFirstArgs>(args?: SelectSubset<T, DeudaCreditoFindFirstArgs<ExtArgs>>): Prisma__DeudaCreditoClient<$Result.GetResult<Prisma.$DeudaCreditoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DeudaCredito that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeudaCreditoFindFirstOrThrowArgs} args - Arguments to find a DeudaCredito
     * @example
     * // Get one DeudaCredito
     * const deudaCredito = await prisma.deudaCredito.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeudaCreditoFindFirstOrThrowArgs>(args?: SelectSubset<T, DeudaCreditoFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeudaCreditoClient<$Result.GetResult<Prisma.$DeudaCreditoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DeudaCreditos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeudaCreditoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeudaCreditos
     * const deudaCreditos = await prisma.deudaCredito.findMany()
     * 
     * // Get first 10 DeudaCreditos
     * const deudaCreditos = await prisma.deudaCredito.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deudaCreditoWithIdOnly = await prisma.deudaCredito.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeudaCreditoFindManyArgs>(args?: SelectSubset<T, DeudaCreditoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeudaCreditoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DeudaCredito.
     * @param {DeudaCreditoCreateArgs} args - Arguments to create a DeudaCredito.
     * @example
     * // Create one DeudaCredito
     * const DeudaCredito = await prisma.deudaCredito.create({
     *   data: {
     *     // ... data to create a DeudaCredito
     *   }
     * })
     * 
     */
    create<T extends DeudaCreditoCreateArgs>(args: SelectSubset<T, DeudaCreditoCreateArgs<ExtArgs>>): Prisma__DeudaCreditoClient<$Result.GetResult<Prisma.$DeudaCreditoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DeudaCreditos.
     * @param {DeudaCreditoCreateManyArgs} args - Arguments to create many DeudaCreditos.
     * @example
     * // Create many DeudaCreditos
     * const deudaCredito = await prisma.deudaCredito.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeudaCreditoCreateManyArgs>(args?: SelectSubset<T, DeudaCreditoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeudaCreditos and returns the data saved in the database.
     * @param {DeudaCreditoCreateManyAndReturnArgs} args - Arguments to create many DeudaCreditos.
     * @example
     * // Create many DeudaCreditos
     * const deudaCredito = await prisma.deudaCredito.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeudaCreditos and only return the `id`
     * const deudaCreditoWithIdOnly = await prisma.deudaCredito.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeudaCreditoCreateManyAndReturnArgs>(args?: SelectSubset<T, DeudaCreditoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeudaCreditoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DeudaCredito.
     * @param {DeudaCreditoDeleteArgs} args - Arguments to delete one DeudaCredito.
     * @example
     * // Delete one DeudaCredito
     * const DeudaCredito = await prisma.deudaCredito.delete({
     *   where: {
     *     // ... filter to delete one DeudaCredito
     *   }
     * })
     * 
     */
    delete<T extends DeudaCreditoDeleteArgs>(args: SelectSubset<T, DeudaCreditoDeleteArgs<ExtArgs>>): Prisma__DeudaCreditoClient<$Result.GetResult<Prisma.$DeudaCreditoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DeudaCredito.
     * @param {DeudaCreditoUpdateArgs} args - Arguments to update one DeudaCredito.
     * @example
     * // Update one DeudaCredito
     * const deudaCredito = await prisma.deudaCredito.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeudaCreditoUpdateArgs>(args: SelectSubset<T, DeudaCreditoUpdateArgs<ExtArgs>>): Prisma__DeudaCreditoClient<$Result.GetResult<Prisma.$DeudaCreditoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DeudaCreditos.
     * @param {DeudaCreditoDeleteManyArgs} args - Arguments to filter DeudaCreditos to delete.
     * @example
     * // Delete a few DeudaCreditos
     * const { count } = await prisma.deudaCredito.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeudaCreditoDeleteManyArgs>(args?: SelectSubset<T, DeudaCreditoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeudaCreditos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeudaCreditoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeudaCreditos
     * const deudaCredito = await prisma.deudaCredito.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeudaCreditoUpdateManyArgs>(args: SelectSubset<T, DeudaCreditoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DeudaCredito.
     * @param {DeudaCreditoUpsertArgs} args - Arguments to update or create a DeudaCredito.
     * @example
     * // Update or create a DeudaCredito
     * const deudaCredito = await prisma.deudaCredito.upsert({
     *   create: {
     *     // ... data to create a DeudaCredito
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeudaCredito we want to update
     *   }
     * })
     */
    upsert<T extends DeudaCreditoUpsertArgs>(args: SelectSubset<T, DeudaCreditoUpsertArgs<ExtArgs>>): Prisma__DeudaCreditoClient<$Result.GetResult<Prisma.$DeudaCreditoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DeudaCreditos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeudaCreditoCountArgs} args - Arguments to filter DeudaCreditos to count.
     * @example
     * // Count the number of DeudaCreditos
     * const count = await prisma.deudaCredito.count({
     *   where: {
     *     // ... the filter for the DeudaCreditos we want to count
     *   }
     * })
    **/
    count<T extends DeudaCreditoCountArgs>(
      args?: Subset<T, DeudaCreditoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeudaCreditoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeudaCredito.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeudaCreditoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeudaCreditoAggregateArgs>(args: Subset<T, DeudaCreditoAggregateArgs>): Prisma.PrismaPromise<GetDeudaCreditoAggregateType<T>>

    /**
     * Group by DeudaCredito.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeudaCreditoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeudaCreditoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeudaCreditoGroupByArgs['orderBy'] }
        : { orderBy?: DeudaCreditoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeudaCreditoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeudaCreditoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeudaCredito model
   */
  readonly fields: DeudaCreditoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeudaCredito.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeudaCreditoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transaccion<T extends TransaccionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TransaccionDefaultArgs<ExtArgs>>): Prisma__TransaccionClient<$Result.GetResult<Prisma.$TransaccionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DeudaCredito model
   */ 
  interface DeudaCreditoFieldRefs {
    readonly id: FieldRef<"DeudaCredito", 'String'>
    readonly transaccionId: FieldRef<"DeudaCredito", 'String'>
    readonly montoTotal: FieldRef<"DeudaCredito", 'Float'>
    readonly saldoPendiente: FieldRef<"DeudaCredito", 'Float'>
    readonly estado: FieldRef<"DeudaCredito", 'String'>
    readonly fechaVencimiento: FieldRef<"DeudaCredito", 'DateTime'>
    readonly createdAt: FieldRef<"DeudaCredito", 'DateTime'>
    readonly updatedAt: FieldRef<"DeudaCredito", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DeudaCredito findUnique
   */
  export type DeudaCreditoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeudaCredito
     */
    select?: DeudaCreditoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeudaCreditoInclude<ExtArgs> | null
    /**
     * Filter, which DeudaCredito to fetch.
     */
    where: DeudaCreditoWhereUniqueInput
  }

  /**
   * DeudaCredito findUniqueOrThrow
   */
  export type DeudaCreditoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeudaCredito
     */
    select?: DeudaCreditoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeudaCreditoInclude<ExtArgs> | null
    /**
     * Filter, which DeudaCredito to fetch.
     */
    where: DeudaCreditoWhereUniqueInput
  }

  /**
   * DeudaCredito findFirst
   */
  export type DeudaCreditoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeudaCredito
     */
    select?: DeudaCreditoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeudaCreditoInclude<ExtArgs> | null
    /**
     * Filter, which DeudaCredito to fetch.
     */
    where?: DeudaCreditoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeudaCreditos to fetch.
     */
    orderBy?: DeudaCreditoOrderByWithRelationInput | DeudaCreditoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeudaCreditos.
     */
    cursor?: DeudaCreditoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeudaCreditos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeudaCreditos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeudaCreditos.
     */
    distinct?: DeudaCreditoScalarFieldEnum | DeudaCreditoScalarFieldEnum[]
  }

  /**
   * DeudaCredito findFirstOrThrow
   */
  export type DeudaCreditoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeudaCredito
     */
    select?: DeudaCreditoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeudaCreditoInclude<ExtArgs> | null
    /**
     * Filter, which DeudaCredito to fetch.
     */
    where?: DeudaCreditoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeudaCreditos to fetch.
     */
    orderBy?: DeudaCreditoOrderByWithRelationInput | DeudaCreditoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeudaCreditos.
     */
    cursor?: DeudaCreditoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeudaCreditos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeudaCreditos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeudaCreditos.
     */
    distinct?: DeudaCreditoScalarFieldEnum | DeudaCreditoScalarFieldEnum[]
  }

  /**
   * DeudaCredito findMany
   */
  export type DeudaCreditoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeudaCredito
     */
    select?: DeudaCreditoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeudaCreditoInclude<ExtArgs> | null
    /**
     * Filter, which DeudaCreditos to fetch.
     */
    where?: DeudaCreditoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeudaCreditos to fetch.
     */
    orderBy?: DeudaCreditoOrderByWithRelationInput | DeudaCreditoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeudaCreditos.
     */
    cursor?: DeudaCreditoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeudaCreditos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeudaCreditos.
     */
    skip?: number
    distinct?: DeudaCreditoScalarFieldEnum | DeudaCreditoScalarFieldEnum[]
  }

  /**
   * DeudaCredito create
   */
  export type DeudaCreditoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeudaCredito
     */
    select?: DeudaCreditoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeudaCreditoInclude<ExtArgs> | null
    /**
     * The data needed to create a DeudaCredito.
     */
    data: XOR<DeudaCreditoCreateInput, DeudaCreditoUncheckedCreateInput>
  }

  /**
   * DeudaCredito createMany
   */
  export type DeudaCreditoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeudaCreditos.
     */
    data: DeudaCreditoCreateManyInput | DeudaCreditoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeudaCredito createManyAndReturn
   */
  export type DeudaCreditoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeudaCredito
     */
    select?: DeudaCreditoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DeudaCreditos.
     */
    data: DeudaCreditoCreateManyInput | DeudaCreditoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeudaCreditoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DeudaCredito update
   */
  export type DeudaCreditoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeudaCredito
     */
    select?: DeudaCreditoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeudaCreditoInclude<ExtArgs> | null
    /**
     * The data needed to update a DeudaCredito.
     */
    data: XOR<DeudaCreditoUpdateInput, DeudaCreditoUncheckedUpdateInput>
    /**
     * Choose, which DeudaCredito to update.
     */
    where: DeudaCreditoWhereUniqueInput
  }

  /**
   * DeudaCredito updateMany
   */
  export type DeudaCreditoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeudaCreditos.
     */
    data: XOR<DeudaCreditoUpdateManyMutationInput, DeudaCreditoUncheckedUpdateManyInput>
    /**
     * Filter which DeudaCreditos to update
     */
    where?: DeudaCreditoWhereInput
  }

  /**
   * DeudaCredito upsert
   */
  export type DeudaCreditoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeudaCredito
     */
    select?: DeudaCreditoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeudaCreditoInclude<ExtArgs> | null
    /**
     * The filter to search for the DeudaCredito to update in case it exists.
     */
    where: DeudaCreditoWhereUniqueInput
    /**
     * In case the DeudaCredito found by the `where` argument doesn't exist, create a new DeudaCredito with this data.
     */
    create: XOR<DeudaCreditoCreateInput, DeudaCreditoUncheckedCreateInput>
    /**
     * In case the DeudaCredito was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeudaCreditoUpdateInput, DeudaCreditoUncheckedUpdateInput>
  }

  /**
   * DeudaCredito delete
   */
  export type DeudaCreditoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeudaCredito
     */
    select?: DeudaCreditoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeudaCreditoInclude<ExtArgs> | null
    /**
     * Filter which DeudaCredito to delete.
     */
    where: DeudaCreditoWhereUniqueInput
  }

  /**
   * DeudaCredito deleteMany
   */
  export type DeudaCreditoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeudaCreditos to delete
     */
    where?: DeudaCreditoWhereInput
  }

  /**
   * DeudaCredito without action
   */
  export type DeudaCreditoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeudaCredito
     */
    select?: DeudaCreditoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeudaCreditoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProveedorScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    nit: 'nit',
    responsable: 'responsable',
    telefono: 'telefono',
    logo: 'logo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProveedorScalarFieldEnum = (typeof ProveedorScalarFieldEnum)[keyof typeof ProveedorScalarFieldEnum]


  export const CategoriaScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    tenantId: 'tenantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoriaScalarFieldEnum = (typeof CategoriaScalarFieldEnum)[keyof typeof CategoriaScalarFieldEnum]


  export const ProductoScalarFieldEnum: {
    codigo: 'codigo',
    proveedorId: 'proveedorId',
    nombre: 'nombre',
    descripcion: 'descripcion',
    marca: 'marca',
    unidadMedida: 'unidadMedida',
    stock: 'stock',
    costo: 'costo',
    precioVenta: 'precioVenta',
    metodoInventario: 'metodoInventario',
    activo: 'activo',
    categoriaId: 'categoriaId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductoScalarFieldEnum = (typeof ProductoScalarFieldEnum)[keyof typeof ProductoScalarFieldEnum]


  export const TransaccionScalarFieldEnum: {
    id: 'id',
    tipoTransaccion: 'tipoTransaccion',
    nroDocumento: 'nroDocumento',
    fecha: 'fecha',
    nitCi: 'nitCi',
    razonSocial: 'razonSocial',
    formaPago: 'formaPago',
    descuento: 'descuento',
    observaciones: 'observaciones',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TransaccionScalarFieldEnum = (typeof TransaccionScalarFieldEnum)[keyof typeof TransaccionScalarFieldEnum]


  export const DetalleTransaccionScalarFieldEnum: {
    id: 'id',
    transaccionId: 'transaccionId',
    productoCodigo: 'productoCodigo',
    cantidad: 'cantidad',
    precioUnitario: 'precioUnitario',
    subtotal: 'subtotal'
  };

  export type DetalleTransaccionScalarFieldEnum = (typeof DetalleTransaccionScalarFieldEnum)[keyof typeof DetalleTransaccionScalarFieldEnum]


  export const PagoScalarFieldEnum: {
    id: 'id',
    transaccionId: 'transaccionId',
    monto: 'monto',
    fecha: 'fecha',
    observaciones: 'observaciones'
  };

  export type PagoScalarFieldEnum = (typeof PagoScalarFieldEnum)[keyof typeof PagoScalarFieldEnum]


  export const DeudaCreditoScalarFieldEnum: {
    id: 'id',
    transaccionId: 'transaccionId',
    montoTotal: 'montoTotal',
    saldoPendiente: 'saldoPendiente',
    estado: 'estado',
    fechaVencimiento: 'fechaVencimiento',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DeudaCreditoScalarFieldEnum = (typeof DeudaCreditoScalarFieldEnum)[keyof typeof DeudaCreditoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type ProveedorWhereInput = {
    AND?: ProveedorWhereInput | ProveedorWhereInput[]
    OR?: ProveedorWhereInput[]
    NOT?: ProveedorWhereInput | ProveedorWhereInput[]
    id?: StringFilter<"Proveedor"> | string
    nombre?: StringFilter<"Proveedor"> | string
    nit?: StringFilter<"Proveedor"> | string
    responsable?: StringNullableFilter<"Proveedor"> | string | null
    telefono?: StringNullableFilter<"Proveedor"> | string | null
    logo?: StringNullableFilter<"Proveedor"> | string | null
    createdAt?: DateTimeFilter<"Proveedor"> | Date | string
    updatedAt?: DateTimeFilter<"Proveedor"> | Date | string
    productos?: ProductoListRelationFilter
  }

  export type ProveedorOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    nit?: SortOrder
    responsable?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productos?: ProductoOrderByRelationAggregateInput
  }

  export type ProveedorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProveedorWhereInput | ProveedorWhereInput[]
    OR?: ProveedorWhereInput[]
    NOT?: ProveedorWhereInput | ProveedorWhereInput[]
    nombre?: StringFilter<"Proveedor"> | string
    nit?: StringFilter<"Proveedor"> | string
    responsable?: StringNullableFilter<"Proveedor"> | string | null
    telefono?: StringNullableFilter<"Proveedor"> | string | null
    logo?: StringNullableFilter<"Proveedor"> | string | null
    createdAt?: DateTimeFilter<"Proveedor"> | Date | string
    updatedAt?: DateTimeFilter<"Proveedor"> | Date | string
    productos?: ProductoListRelationFilter
  }, "id">

  export type ProveedorOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    nit?: SortOrder
    responsable?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProveedorCountOrderByAggregateInput
    _max?: ProveedorMaxOrderByAggregateInput
    _min?: ProveedorMinOrderByAggregateInput
  }

  export type ProveedorScalarWhereWithAggregatesInput = {
    AND?: ProveedorScalarWhereWithAggregatesInput | ProveedorScalarWhereWithAggregatesInput[]
    OR?: ProveedorScalarWhereWithAggregatesInput[]
    NOT?: ProveedorScalarWhereWithAggregatesInput | ProveedorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Proveedor"> | string
    nombre?: StringWithAggregatesFilter<"Proveedor"> | string
    nit?: StringWithAggregatesFilter<"Proveedor"> | string
    responsable?: StringNullableWithAggregatesFilter<"Proveedor"> | string | null
    telefono?: StringNullableWithAggregatesFilter<"Proveedor"> | string | null
    logo?: StringNullableWithAggregatesFilter<"Proveedor"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Proveedor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Proveedor"> | Date | string
  }

  export type CategoriaWhereInput = {
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    id?: StringFilter<"Categoria"> | string
    nombre?: StringFilter<"Categoria"> | string
    tenantId?: StringFilter<"Categoria"> | string
    createdAt?: DateTimeFilter<"Categoria"> | Date | string
    updatedAt?: DateTimeFilter<"Categoria"> | Date | string
    productos?: ProductoListRelationFilter
  }

  export type CategoriaOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productos?: ProductoOrderByRelationAggregateInput
  }

  export type CategoriaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    nombre?: StringFilter<"Categoria"> | string
    tenantId?: StringFilter<"Categoria"> | string
    createdAt?: DateTimeFilter<"Categoria"> | Date | string
    updatedAt?: DateTimeFilter<"Categoria"> | Date | string
    productos?: ProductoListRelationFilter
  }, "id">

  export type CategoriaOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoriaCountOrderByAggregateInput
    _max?: CategoriaMaxOrderByAggregateInput
    _min?: CategoriaMinOrderByAggregateInput
  }

  export type CategoriaScalarWhereWithAggregatesInput = {
    AND?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    OR?: CategoriaScalarWhereWithAggregatesInput[]
    NOT?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Categoria"> | string
    nombre?: StringWithAggregatesFilter<"Categoria"> | string
    tenantId?: StringWithAggregatesFilter<"Categoria"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Categoria"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Categoria"> | Date | string
  }

  export type ProductoWhereInput = {
    AND?: ProductoWhereInput | ProductoWhereInput[]
    OR?: ProductoWhereInput[]
    NOT?: ProductoWhereInput | ProductoWhereInput[]
    codigo?: StringFilter<"Producto"> | string
    proveedorId?: StringNullableFilter<"Producto"> | string | null
    nombre?: StringFilter<"Producto"> | string
    descripcion?: StringFilter<"Producto"> | string
    marca?: StringFilter<"Producto"> | string
    unidadMedida?: StringFilter<"Producto"> | string
    stock?: IntFilter<"Producto"> | number
    costo?: FloatFilter<"Producto"> | number
    precioVenta?: FloatFilter<"Producto"> | number
    metodoInventario?: StringFilter<"Producto"> | string
    activo?: BoolFilter<"Producto"> | boolean
    categoriaId?: StringNullableFilter<"Producto"> | string | null
    createdAt?: DateTimeFilter<"Producto"> | Date | string
    updatedAt?: DateTimeFilter<"Producto"> | Date | string
    proveedor?: XOR<ProveedorNullableRelationFilter, ProveedorWhereInput> | null
    categoria?: XOR<CategoriaNullableRelationFilter, CategoriaWhereInput> | null
    detalles?: DetalleTransaccionListRelationFilter
  }

  export type ProductoOrderByWithRelationInput = {
    codigo?: SortOrder
    proveedorId?: SortOrderInput | SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    marca?: SortOrder
    unidadMedida?: SortOrder
    stock?: SortOrder
    costo?: SortOrder
    precioVenta?: SortOrder
    metodoInventario?: SortOrder
    activo?: SortOrder
    categoriaId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    proveedor?: ProveedorOrderByWithRelationInput
    categoria?: CategoriaOrderByWithRelationInput
    detalles?: DetalleTransaccionOrderByRelationAggregateInput
  }

  export type ProductoWhereUniqueInput = Prisma.AtLeast<{
    codigo?: string
    AND?: ProductoWhereInput | ProductoWhereInput[]
    OR?: ProductoWhereInput[]
    NOT?: ProductoWhereInput | ProductoWhereInput[]
    proveedorId?: StringNullableFilter<"Producto"> | string | null
    nombre?: StringFilter<"Producto"> | string
    descripcion?: StringFilter<"Producto"> | string
    marca?: StringFilter<"Producto"> | string
    unidadMedida?: StringFilter<"Producto"> | string
    stock?: IntFilter<"Producto"> | number
    costo?: FloatFilter<"Producto"> | number
    precioVenta?: FloatFilter<"Producto"> | number
    metodoInventario?: StringFilter<"Producto"> | string
    activo?: BoolFilter<"Producto"> | boolean
    categoriaId?: StringNullableFilter<"Producto"> | string | null
    createdAt?: DateTimeFilter<"Producto"> | Date | string
    updatedAt?: DateTimeFilter<"Producto"> | Date | string
    proveedor?: XOR<ProveedorNullableRelationFilter, ProveedorWhereInput> | null
    categoria?: XOR<CategoriaNullableRelationFilter, CategoriaWhereInput> | null
    detalles?: DetalleTransaccionListRelationFilter
  }, "codigo">

  export type ProductoOrderByWithAggregationInput = {
    codigo?: SortOrder
    proveedorId?: SortOrderInput | SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    marca?: SortOrder
    unidadMedida?: SortOrder
    stock?: SortOrder
    costo?: SortOrder
    precioVenta?: SortOrder
    metodoInventario?: SortOrder
    activo?: SortOrder
    categoriaId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductoCountOrderByAggregateInput
    _avg?: ProductoAvgOrderByAggregateInput
    _max?: ProductoMaxOrderByAggregateInput
    _min?: ProductoMinOrderByAggregateInput
    _sum?: ProductoSumOrderByAggregateInput
  }

  export type ProductoScalarWhereWithAggregatesInput = {
    AND?: ProductoScalarWhereWithAggregatesInput | ProductoScalarWhereWithAggregatesInput[]
    OR?: ProductoScalarWhereWithAggregatesInput[]
    NOT?: ProductoScalarWhereWithAggregatesInput | ProductoScalarWhereWithAggregatesInput[]
    codigo?: StringWithAggregatesFilter<"Producto"> | string
    proveedorId?: StringNullableWithAggregatesFilter<"Producto"> | string | null
    nombre?: StringWithAggregatesFilter<"Producto"> | string
    descripcion?: StringWithAggregatesFilter<"Producto"> | string
    marca?: StringWithAggregatesFilter<"Producto"> | string
    unidadMedida?: StringWithAggregatesFilter<"Producto"> | string
    stock?: IntWithAggregatesFilter<"Producto"> | number
    costo?: FloatWithAggregatesFilter<"Producto"> | number
    precioVenta?: FloatWithAggregatesFilter<"Producto"> | number
    metodoInventario?: StringWithAggregatesFilter<"Producto"> | string
    activo?: BoolWithAggregatesFilter<"Producto"> | boolean
    categoriaId?: StringNullableWithAggregatesFilter<"Producto"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Producto"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Producto"> | Date | string
  }

  export type TransaccionWhereInput = {
    AND?: TransaccionWhereInput | TransaccionWhereInput[]
    OR?: TransaccionWhereInput[]
    NOT?: TransaccionWhereInput | TransaccionWhereInput[]
    id?: StringFilter<"Transaccion"> | string
    tipoTransaccion?: StringFilter<"Transaccion"> | string
    nroDocumento?: StringFilter<"Transaccion"> | string
    fecha?: DateTimeFilter<"Transaccion"> | Date | string
    nitCi?: StringFilter<"Transaccion"> | string
    razonSocial?: StringFilter<"Transaccion"> | string
    formaPago?: StringFilter<"Transaccion"> | string
    descuento?: FloatFilter<"Transaccion"> | number
    observaciones?: StringNullableFilter<"Transaccion"> | string | null
    createdAt?: DateTimeFilter<"Transaccion"> | Date | string
    updatedAt?: DateTimeFilter<"Transaccion"> | Date | string
    detalles?: DetalleTransaccionListRelationFilter
    pagos?: PagoListRelationFilter
    deudaCredito?: XOR<DeudaCreditoNullableRelationFilter, DeudaCreditoWhereInput> | null
  }

  export type TransaccionOrderByWithRelationInput = {
    id?: SortOrder
    tipoTransaccion?: SortOrder
    nroDocumento?: SortOrder
    fecha?: SortOrder
    nitCi?: SortOrder
    razonSocial?: SortOrder
    formaPago?: SortOrder
    descuento?: SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    detalles?: DetalleTransaccionOrderByRelationAggregateInput
    pagos?: PagoOrderByRelationAggregateInput
    deudaCredito?: DeudaCreditoOrderByWithRelationInput
  }

  export type TransaccionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransaccionWhereInput | TransaccionWhereInput[]
    OR?: TransaccionWhereInput[]
    NOT?: TransaccionWhereInput | TransaccionWhereInput[]
    tipoTransaccion?: StringFilter<"Transaccion"> | string
    nroDocumento?: StringFilter<"Transaccion"> | string
    fecha?: DateTimeFilter<"Transaccion"> | Date | string
    nitCi?: StringFilter<"Transaccion"> | string
    razonSocial?: StringFilter<"Transaccion"> | string
    formaPago?: StringFilter<"Transaccion"> | string
    descuento?: FloatFilter<"Transaccion"> | number
    observaciones?: StringNullableFilter<"Transaccion"> | string | null
    createdAt?: DateTimeFilter<"Transaccion"> | Date | string
    updatedAt?: DateTimeFilter<"Transaccion"> | Date | string
    detalles?: DetalleTransaccionListRelationFilter
    pagos?: PagoListRelationFilter
    deudaCredito?: XOR<DeudaCreditoNullableRelationFilter, DeudaCreditoWhereInput> | null
  }, "id">

  export type TransaccionOrderByWithAggregationInput = {
    id?: SortOrder
    tipoTransaccion?: SortOrder
    nroDocumento?: SortOrder
    fecha?: SortOrder
    nitCi?: SortOrder
    razonSocial?: SortOrder
    formaPago?: SortOrder
    descuento?: SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TransaccionCountOrderByAggregateInput
    _avg?: TransaccionAvgOrderByAggregateInput
    _max?: TransaccionMaxOrderByAggregateInput
    _min?: TransaccionMinOrderByAggregateInput
    _sum?: TransaccionSumOrderByAggregateInput
  }

  export type TransaccionScalarWhereWithAggregatesInput = {
    AND?: TransaccionScalarWhereWithAggregatesInput | TransaccionScalarWhereWithAggregatesInput[]
    OR?: TransaccionScalarWhereWithAggregatesInput[]
    NOT?: TransaccionScalarWhereWithAggregatesInput | TransaccionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaccion"> | string
    tipoTransaccion?: StringWithAggregatesFilter<"Transaccion"> | string
    nroDocumento?: StringWithAggregatesFilter<"Transaccion"> | string
    fecha?: DateTimeWithAggregatesFilter<"Transaccion"> | Date | string
    nitCi?: StringWithAggregatesFilter<"Transaccion"> | string
    razonSocial?: StringWithAggregatesFilter<"Transaccion"> | string
    formaPago?: StringWithAggregatesFilter<"Transaccion"> | string
    descuento?: FloatWithAggregatesFilter<"Transaccion"> | number
    observaciones?: StringNullableWithAggregatesFilter<"Transaccion"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaccion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transaccion"> | Date | string
  }

  export type DetalleTransaccionWhereInput = {
    AND?: DetalleTransaccionWhereInput | DetalleTransaccionWhereInput[]
    OR?: DetalleTransaccionWhereInput[]
    NOT?: DetalleTransaccionWhereInput | DetalleTransaccionWhereInput[]
    id?: StringFilter<"DetalleTransaccion"> | string
    transaccionId?: StringFilter<"DetalleTransaccion"> | string
    productoCodigo?: StringFilter<"DetalleTransaccion"> | string
    cantidad?: IntFilter<"DetalleTransaccion"> | number
    precioUnitario?: FloatFilter<"DetalleTransaccion"> | number
    subtotal?: FloatFilter<"DetalleTransaccion"> | number
    transaccion?: XOR<TransaccionRelationFilter, TransaccionWhereInput>
    producto?: XOR<ProductoRelationFilter, ProductoWhereInput>
  }

  export type DetalleTransaccionOrderByWithRelationInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    productoCodigo?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    transaccion?: TransaccionOrderByWithRelationInput
    producto?: ProductoOrderByWithRelationInput
  }

  export type DetalleTransaccionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DetalleTransaccionWhereInput | DetalleTransaccionWhereInput[]
    OR?: DetalleTransaccionWhereInput[]
    NOT?: DetalleTransaccionWhereInput | DetalleTransaccionWhereInput[]
    transaccionId?: StringFilter<"DetalleTransaccion"> | string
    productoCodigo?: StringFilter<"DetalleTransaccion"> | string
    cantidad?: IntFilter<"DetalleTransaccion"> | number
    precioUnitario?: FloatFilter<"DetalleTransaccion"> | number
    subtotal?: FloatFilter<"DetalleTransaccion"> | number
    transaccion?: XOR<TransaccionRelationFilter, TransaccionWhereInput>
    producto?: XOR<ProductoRelationFilter, ProductoWhereInput>
  }, "id">

  export type DetalleTransaccionOrderByWithAggregationInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    productoCodigo?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    _count?: DetalleTransaccionCountOrderByAggregateInput
    _avg?: DetalleTransaccionAvgOrderByAggregateInput
    _max?: DetalleTransaccionMaxOrderByAggregateInput
    _min?: DetalleTransaccionMinOrderByAggregateInput
    _sum?: DetalleTransaccionSumOrderByAggregateInput
  }

  export type DetalleTransaccionScalarWhereWithAggregatesInput = {
    AND?: DetalleTransaccionScalarWhereWithAggregatesInput | DetalleTransaccionScalarWhereWithAggregatesInput[]
    OR?: DetalleTransaccionScalarWhereWithAggregatesInput[]
    NOT?: DetalleTransaccionScalarWhereWithAggregatesInput | DetalleTransaccionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DetalleTransaccion"> | string
    transaccionId?: StringWithAggregatesFilter<"DetalleTransaccion"> | string
    productoCodigo?: StringWithAggregatesFilter<"DetalleTransaccion"> | string
    cantidad?: IntWithAggregatesFilter<"DetalleTransaccion"> | number
    precioUnitario?: FloatWithAggregatesFilter<"DetalleTransaccion"> | number
    subtotal?: FloatWithAggregatesFilter<"DetalleTransaccion"> | number
  }

  export type PagoWhereInput = {
    AND?: PagoWhereInput | PagoWhereInput[]
    OR?: PagoWhereInput[]
    NOT?: PagoWhereInput | PagoWhereInput[]
    id?: StringFilter<"Pago"> | string
    transaccionId?: StringFilter<"Pago"> | string
    monto?: FloatFilter<"Pago"> | number
    fecha?: DateTimeFilter<"Pago"> | Date | string
    observaciones?: StringNullableFilter<"Pago"> | string | null
    transaccion?: XOR<TransaccionRelationFilter, TransaccionWhereInput>
  }

  export type PagoOrderByWithRelationInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    observaciones?: SortOrderInput | SortOrder
    transaccion?: TransaccionOrderByWithRelationInput
  }

  export type PagoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PagoWhereInput | PagoWhereInput[]
    OR?: PagoWhereInput[]
    NOT?: PagoWhereInput | PagoWhereInput[]
    transaccionId?: StringFilter<"Pago"> | string
    monto?: FloatFilter<"Pago"> | number
    fecha?: DateTimeFilter<"Pago"> | Date | string
    observaciones?: StringNullableFilter<"Pago"> | string | null
    transaccion?: XOR<TransaccionRelationFilter, TransaccionWhereInput>
  }, "id">

  export type PagoOrderByWithAggregationInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    observaciones?: SortOrderInput | SortOrder
    _count?: PagoCountOrderByAggregateInput
    _avg?: PagoAvgOrderByAggregateInput
    _max?: PagoMaxOrderByAggregateInput
    _min?: PagoMinOrderByAggregateInput
    _sum?: PagoSumOrderByAggregateInput
  }

  export type PagoScalarWhereWithAggregatesInput = {
    AND?: PagoScalarWhereWithAggregatesInput | PagoScalarWhereWithAggregatesInput[]
    OR?: PagoScalarWhereWithAggregatesInput[]
    NOT?: PagoScalarWhereWithAggregatesInput | PagoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pago"> | string
    transaccionId?: StringWithAggregatesFilter<"Pago"> | string
    monto?: FloatWithAggregatesFilter<"Pago"> | number
    fecha?: DateTimeWithAggregatesFilter<"Pago"> | Date | string
    observaciones?: StringNullableWithAggregatesFilter<"Pago"> | string | null
  }

  export type DeudaCreditoWhereInput = {
    AND?: DeudaCreditoWhereInput | DeudaCreditoWhereInput[]
    OR?: DeudaCreditoWhereInput[]
    NOT?: DeudaCreditoWhereInput | DeudaCreditoWhereInput[]
    id?: StringFilter<"DeudaCredito"> | string
    transaccionId?: StringFilter<"DeudaCredito"> | string
    montoTotal?: FloatFilter<"DeudaCredito"> | number
    saldoPendiente?: FloatFilter<"DeudaCredito"> | number
    estado?: StringFilter<"DeudaCredito"> | string
    fechaVencimiento?: DateTimeNullableFilter<"DeudaCredito"> | Date | string | null
    createdAt?: DateTimeFilter<"DeudaCredito"> | Date | string
    updatedAt?: DateTimeFilter<"DeudaCredito"> | Date | string
    transaccion?: XOR<TransaccionRelationFilter, TransaccionWhereInput>
  }

  export type DeudaCreditoOrderByWithRelationInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    montoTotal?: SortOrder
    saldoPendiente?: SortOrder
    estado?: SortOrder
    fechaVencimiento?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transaccion?: TransaccionOrderByWithRelationInput
  }

  export type DeudaCreditoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transaccionId?: string
    AND?: DeudaCreditoWhereInput | DeudaCreditoWhereInput[]
    OR?: DeudaCreditoWhereInput[]
    NOT?: DeudaCreditoWhereInput | DeudaCreditoWhereInput[]
    montoTotal?: FloatFilter<"DeudaCredito"> | number
    saldoPendiente?: FloatFilter<"DeudaCredito"> | number
    estado?: StringFilter<"DeudaCredito"> | string
    fechaVencimiento?: DateTimeNullableFilter<"DeudaCredito"> | Date | string | null
    createdAt?: DateTimeFilter<"DeudaCredito"> | Date | string
    updatedAt?: DateTimeFilter<"DeudaCredito"> | Date | string
    transaccion?: XOR<TransaccionRelationFilter, TransaccionWhereInput>
  }, "id" | "transaccionId">

  export type DeudaCreditoOrderByWithAggregationInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    montoTotal?: SortOrder
    saldoPendiente?: SortOrder
    estado?: SortOrder
    fechaVencimiento?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DeudaCreditoCountOrderByAggregateInput
    _avg?: DeudaCreditoAvgOrderByAggregateInput
    _max?: DeudaCreditoMaxOrderByAggregateInput
    _min?: DeudaCreditoMinOrderByAggregateInput
    _sum?: DeudaCreditoSumOrderByAggregateInput
  }

  export type DeudaCreditoScalarWhereWithAggregatesInput = {
    AND?: DeudaCreditoScalarWhereWithAggregatesInput | DeudaCreditoScalarWhereWithAggregatesInput[]
    OR?: DeudaCreditoScalarWhereWithAggregatesInput[]
    NOT?: DeudaCreditoScalarWhereWithAggregatesInput | DeudaCreditoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DeudaCredito"> | string
    transaccionId?: StringWithAggregatesFilter<"DeudaCredito"> | string
    montoTotal?: FloatWithAggregatesFilter<"DeudaCredito"> | number
    saldoPendiente?: FloatWithAggregatesFilter<"DeudaCredito"> | number
    estado?: StringWithAggregatesFilter<"DeudaCredito"> | string
    fechaVencimiento?: DateTimeNullableWithAggregatesFilter<"DeudaCredito"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DeudaCredito"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DeudaCredito"> | Date | string
  }

  export type ProveedorCreateInput = {
    id?: string
    nombre: string
    nit: string
    responsable?: string | null
    telefono?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productos?: ProductoCreateNestedManyWithoutProveedorInput
  }

  export type ProveedorUncheckedCreateInput = {
    id?: string
    nombre: string
    nit: string
    responsable?: string | null
    telefono?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productos?: ProductoUncheckedCreateNestedManyWithoutProveedorInput
  }

  export type ProveedorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    nit?: StringFieldUpdateOperationsInput | string
    responsable?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productos?: ProductoUpdateManyWithoutProveedorNestedInput
  }

  export type ProveedorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    nit?: StringFieldUpdateOperationsInput | string
    responsable?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productos?: ProductoUncheckedUpdateManyWithoutProveedorNestedInput
  }

  export type ProveedorCreateManyInput = {
    id?: string
    nombre: string
    nit: string
    responsable?: string | null
    telefono?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProveedorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    nit?: StringFieldUpdateOperationsInput | string
    responsable?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProveedorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    nit?: StringFieldUpdateOperationsInput | string
    responsable?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaCreateInput = {
    id?: string
    nombre: string
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    productos?: ProductoCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUncheckedCreateInput = {
    id?: string
    nombre: string
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    productos?: ProductoUncheckedCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productos?: ProductoUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productos?: ProductoUncheckedUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaCreateManyInput = {
    id?: string
    nombre: string
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoriaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductoCreateInput = {
    codigo: string
    nombre?: string
    descripcion: string
    marca: string
    unidadMedida?: string
    stock?: number
    costo: number
    precioVenta: number
    metodoInventario?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    proveedor?: ProveedorCreateNestedOneWithoutProductosInput
    categoria?: CategoriaCreateNestedOneWithoutProductosInput
    detalles?: DetalleTransaccionCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateInput = {
    codigo: string
    proveedorId?: string | null
    nombre?: string
    descripcion: string
    marca: string
    unidadMedida?: string
    stock?: number
    costo: number
    precioVenta: number
    metodoInventario?: string
    activo?: boolean
    categoriaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    detalles?: DetalleTransaccionUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoUpdateInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    unidadMedida?: StringFieldUpdateOperationsInput | string
    stock?: IntFieldUpdateOperationsInput | number
    costo?: FloatFieldUpdateOperationsInput | number
    precioVenta?: FloatFieldUpdateOperationsInput | number
    metodoInventario?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proveedor?: ProveedorUpdateOneWithoutProductosNestedInput
    categoria?: CategoriaUpdateOneWithoutProductosNestedInput
    detalles?: DetalleTransaccionUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    proveedorId?: NullableStringFieldUpdateOperationsInput | string | null
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    unidadMedida?: StringFieldUpdateOperationsInput | string
    stock?: IntFieldUpdateOperationsInput | number
    costo?: FloatFieldUpdateOperationsInput | number
    precioVenta?: FloatFieldUpdateOperationsInput | number
    metodoInventario?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    categoriaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleTransaccionUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductoCreateManyInput = {
    codigo: string
    proveedorId?: string | null
    nombre?: string
    descripcion: string
    marca: string
    unidadMedida?: string
    stock?: number
    costo: number
    precioVenta: number
    metodoInventario?: string
    activo?: boolean
    categoriaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductoUpdateManyMutationInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    unidadMedida?: StringFieldUpdateOperationsInput | string
    stock?: IntFieldUpdateOperationsInput | number
    costo?: FloatFieldUpdateOperationsInput | number
    precioVenta?: FloatFieldUpdateOperationsInput | number
    metodoInventario?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductoUncheckedUpdateManyInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    proveedorId?: NullableStringFieldUpdateOperationsInput | string | null
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    unidadMedida?: StringFieldUpdateOperationsInput | string
    stock?: IntFieldUpdateOperationsInput | number
    costo?: FloatFieldUpdateOperationsInput | number
    precioVenta?: FloatFieldUpdateOperationsInput | number
    metodoInventario?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    categoriaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransaccionCreateInput = {
    id?: string
    tipoTransaccion: string
    nroDocumento: string
    fecha?: Date | string
    nitCi: string
    razonSocial: string
    formaPago?: string
    descuento?: number
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    detalles?: DetalleTransaccionCreateNestedManyWithoutTransaccionInput
    pagos?: PagoCreateNestedManyWithoutTransaccionInput
    deudaCredito?: DeudaCreditoCreateNestedOneWithoutTransaccionInput
  }

  export type TransaccionUncheckedCreateInput = {
    id?: string
    tipoTransaccion: string
    nroDocumento: string
    fecha?: Date | string
    nitCi: string
    razonSocial: string
    formaPago?: string
    descuento?: number
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    detalles?: DetalleTransaccionUncheckedCreateNestedManyWithoutTransaccionInput
    pagos?: PagoUncheckedCreateNestedManyWithoutTransaccionInput
    deudaCredito?: DeudaCreditoUncheckedCreateNestedOneWithoutTransaccionInput
  }

  export type TransaccionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoTransaccion?: StringFieldUpdateOperationsInput | string
    nroDocumento?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    nitCi?: StringFieldUpdateOperationsInput | string
    razonSocial?: StringFieldUpdateOperationsInput | string
    formaPago?: StringFieldUpdateOperationsInput | string
    descuento?: FloatFieldUpdateOperationsInput | number
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleTransaccionUpdateManyWithoutTransaccionNestedInput
    pagos?: PagoUpdateManyWithoutTransaccionNestedInput
    deudaCredito?: DeudaCreditoUpdateOneWithoutTransaccionNestedInput
  }

  export type TransaccionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoTransaccion?: StringFieldUpdateOperationsInput | string
    nroDocumento?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    nitCi?: StringFieldUpdateOperationsInput | string
    razonSocial?: StringFieldUpdateOperationsInput | string
    formaPago?: StringFieldUpdateOperationsInput | string
    descuento?: FloatFieldUpdateOperationsInput | number
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleTransaccionUncheckedUpdateManyWithoutTransaccionNestedInput
    pagos?: PagoUncheckedUpdateManyWithoutTransaccionNestedInput
    deudaCredito?: DeudaCreditoUncheckedUpdateOneWithoutTransaccionNestedInput
  }

  export type TransaccionCreateManyInput = {
    id?: string
    tipoTransaccion: string
    nroDocumento: string
    fecha?: Date | string
    nitCi: string
    razonSocial: string
    formaPago?: string
    descuento?: number
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransaccionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoTransaccion?: StringFieldUpdateOperationsInput | string
    nroDocumento?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    nitCi?: StringFieldUpdateOperationsInput | string
    razonSocial?: StringFieldUpdateOperationsInput | string
    formaPago?: StringFieldUpdateOperationsInput | string
    descuento?: FloatFieldUpdateOperationsInput | number
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransaccionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoTransaccion?: StringFieldUpdateOperationsInput | string
    nroDocumento?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    nitCi?: StringFieldUpdateOperationsInput | string
    razonSocial?: StringFieldUpdateOperationsInput | string
    formaPago?: StringFieldUpdateOperationsInput | string
    descuento?: FloatFieldUpdateOperationsInput | number
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DetalleTransaccionCreateInput = {
    id?: string
    cantidad: number
    precioUnitario: number
    subtotal: number
    transaccion: TransaccionCreateNestedOneWithoutDetallesInput
    producto: ProductoCreateNestedOneWithoutDetallesInput
  }

  export type DetalleTransaccionUncheckedCreateInput = {
    id?: string
    transaccionId: string
    productoCodigo: string
    cantidad: number
    precioUnitario: number
    subtotal: number
  }

  export type DetalleTransaccionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    transaccion?: TransaccionUpdateOneRequiredWithoutDetallesNestedInput
    producto?: ProductoUpdateOneRequiredWithoutDetallesNestedInput
  }

  export type DetalleTransaccionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transaccionId?: StringFieldUpdateOperationsInput | string
    productoCodigo?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
  }

  export type DetalleTransaccionCreateManyInput = {
    id?: string
    transaccionId: string
    productoCodigo: string
    cantidad: number
    precioUnitario: number
    subtotal: number
  }

  export type DetalleTransaccionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
  }

  export type DetalleTransaccionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    transaccionId?: StringFieldUpdateOperationsInput | string
    productoCodigo?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
  }

  export type PagoCreateInput = {
    id?: string
    monto: number
    fecha?: Date | string
    observaciones?: string | null
    transaccion: TransaccionCreateNestedOneWithoutPagosInput
  }

  export type PagoUncheckedCreateInput = {
    id?: string
    transaccionId: string
    monto: number
    fecha?: Date | string
    observaciones?: string | null
  }

  export type PagoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    transaccion?: TransaccionUpdateOneRequiredWithoutPagosNestedInput
  }

  export type PagoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transaccionId?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PagoCreateManyInput = {
    id?: string
    transaccionId: string
    monto: number
    fecha?: Date | string
    observaciones?: string | null
  }

  export type PagoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PagoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    transaccionId?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DeudaCreditoCreateInput = {
    id?: string
    montoTotal: number
    saldoPendiente: number
    estado?: string
    fechaVencimiento?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transaccion: TransaccionCreateNestedOneWithoutDeudaCreditoInput
  }

  export type DeudaCreditoUncheckedCreateInput = {
    id?: string
    transaccionId: string
    montoTotal: number
    saldoPendiente: number
    estado?: string
    fechaVencimiento?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeudaCreditoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    montoTotal?: FloatFieldUpdateOperationsInput | number
    saldoPendiente?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaccion?: TransaccionUpdateOneRequiredWithoutDeudaCreditoNestedInput
  }

  export type DeudaCreditoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transaccionId?: StringFieldUpdateOperationsInput | string
    montoTotal?: FloatFieldUpdateOperationsInput | number
    saldoPendiente?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeudaCreditoCreateManyInput = {
    id?: string
    transaccionId: string
    montoTotal: number
    saldoPendiente: number
    estado?: string
    fechaVencimiento?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeudaCreditoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    montoTotal?: FloatFieldUpdateOperationsInput | number
    saldoPendiente?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeudaCreditoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    transaccionId?: StringFieldUpdateOperationsInput | string
    montoTotal?: FloatFieldUpdateOperationsInput | number
    saldoPendiente?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProductoListRelationFilter = {
    every?: ProductoWhereInput
    some?: ProductoWhereInput
    none?: ProductoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProveedorCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    nit?: SortOrder
    responsable?: SortOrder
    telefono?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProveedorMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    nit?: SortOrder
    responsable?: SortOrder
    telefono?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProveedorMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    nit?: SortOrder
    responsable?: SortOrder
    telefono?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CategoriaCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoriaMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoriaMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ProveedorNullableRelationFilter = {
    is?: ProveedorWhereInput | null
    isNot?: ProveedorWhereInput | null
  }

  export type CategoriaNullableRelationFilter = {
    is?: CategoriaWhereInput | null
    isNot?: CategoriaWhereInput | null
  }

  export type DetalleTransaccionListRelationFilter = {
    every?: DetalleTransaccionWhereInput
    some?: DetalleTransaccionWhereInput
    none?: DetalleTransaccionWhereInput
  }

  export type DetalleTransaccionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductoCountOrderByAggregateInput = {
    codigo?: SortOrder
    proveedorId?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    marca?: SortOrder
    unidadMedida?: SortOrder
    stock?: SortOrder
    costo?: SortOrder
    precioVenta?: SortOrder
    metodoInventario?: SortOrder
    activo?: SortOrder
    categoriaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductoAvgOrderByAggregateInput = {
    stock?: SortOrder
    costo?: SortOrder
    precioVenta?: SortOrder
  }

  export type ProductoMaxOrderByAggregateInput = {
    codigo?: SortOrder
    proveedorId?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    marca?: SortOrder
    unidadMedida?: SortOrder
    stock?: SortOrder
    costo?: SortOrder
    precioVenta?: SortOrder
    metodoInventario?: SortOrder
    activo?: SortOrder
    categoriaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductoMinOrderByAggregateInput = {
    codigo?: SortOrder
    proveedorId?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    marca?: SortOrder
    unidadMedida?: SortOrder
    stock?: SortOrder
    costo?: SortOrder
    precioVenta?: SortOrder
    metodoInventario?: SortOrder
    activo?: SortOrder
    categoriaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductoSumOrderByAggregateInput = {
    stock?: SortOrder
    costo?: SortOrder
    precioVenta?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PagoListRelationFilter = {
    every?: PagoWhereInput
    some?: PagoWhereInput
    none?: PagoWhereInput
  }

  export type DeudaCreditoNullableRelationFilter = {
    is?: DeudaCreditoWhereInput | null
    isNot?: DeudaCreditoWhereInput | null
  }

  export type PagoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransaccionCountOrderByAggregateInput = {
    id?: SortOrder
    tipoTransaccion?: SortOrder
    nroDocumento?: SortOrder
    fecha?: SortOrder
    nitCi?: SortOrder
    razonSocial?: SortOrder
    formaPago?: SortOrder
    descuento?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransaccionAvgOrderByAggregateInput = {
    descuento?: SortOrder
  }

  export type TransaccionMaxOrderByAggregateInput = {
    id?: SortOrder
    tipoTransaccion?: SortOrder
    nroDocumento?: SortOrder
    fecha?: SortOrder
    nitCi?: SortOrder
    razonSocial?: SortOrder
    formaPago?: SortOrder
    descuento?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransaccionMinOrderByAggregateInput = {
    id?: SortOrder
    tipoTransaccion?: SortOrder
    nroDocumento?: SortOrder
    fecha?: SortOrder
    nitCi?: SortOrder
    razonSocial?: SortOrder
    formaPago?: SortOrder
    descuento?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransaccionSumOrderByAggregateInput = {
    descuento?: SortOrder
  }

  export type TransaccionRelationFilter = {
    is?: TransaccionWhereInput
    isNot?: TransaccionWhereInput
  }

  export type ProductoRelationFilter = {
    is?: ProductoWhereInput
    isNot?: ProductoWhereInput
  }

  export type DetalleTransaccionCountOrderByAggregateInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    productoCodigo?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type DetalleTransaccionAvgOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type DetalleTransaccionMaxOrderByAggregateInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    productoCodigo?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type DetalleTransaccionMinOrderByAggregateInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    productoCodigo?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type DetalleTransaccionSumOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type PagoCountOrderByAggregateInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    observaciones?: SortOrder
  }

  export type PagoAvgOrderByAggregateInput = {
    monto?: SortOrder
  }

  export type PagoMaxOrderByAggregateInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    observaciones?: SortOrder
  }

  export type PagoMinOrderByAggregateInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    observaciones?: SortOrder
  }

  export type PagoSumOrderByAggregateInput = {
    monto?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DeudaCreditoCountOrderByAggregateInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    montoTotal?: SortOrder
    saldoPendiente?: SortOrder
    estado?: SortOrder
    fechaVencimiento?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeudaCreditoAvgOrderByAggregateInput = {
    montoTotal?: SortOrder
    saldoPendiente?: SortOrder
  }

  export type DeudaCreditoMaxOrderByAggregateInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    montoTotal?: SortOrder
    saldoPendiente?: SortOrder
    estado?: SortOrder
    fechaVencimiento?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeudaCreditoMinOrderByAggregateInput = {
    id?: SortOrder
    transaccionId?: SortOrder
    montoTotal?: SortOrder
    saldoPendiente?: SortOrder
    estado?: SortOrder
    fechaVencimiento?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeudaCreditoSumOrderByAggregateInput = {
    montoTotal?: SortOrder
    saldoPendiente?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProductoCreateNestedManyWithoutProveedorInput = {
    create?: XOR<ProductoCreateWithoutProveedorInput, ProductoUncheckedCreateWithoutProveedorInput> | ProductoCreateWithoutProveedorInput[] | ProductoUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutProveedorInput | ProductoCreateOrConnectWithoutProveedorInput[]
    createMany?: ProductoCreateManyProveedorInputEnvelope
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
  }

  export type ProductoUncheckedCreateNestedManyWithoutProveedorInput = {
    create?: XOR<ProductoCreateWithoutProveedorInput, ProductoUncheckedCreateWithoutProveedorInput> | ProductoCreateWithoutProveedorInput[] | ProductoUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutProveedorInput | ProductoCreateOrConnectWithoutProveedorInput[]
    createMany?: ProductoCreateManyProveedorInputEnvelope
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProductoUpdateManyWithoutProveedorNestedInput = {
    create?: XOR<ProductoCreateWithoutProveedorInput, ProductoUncheckedCreateWithoutProveedorInput> | ProductoCreateWithoutProveedorInput[] | ProductoUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutProveedorInput | ProductoCreateOrConnectWithoutProveedorInput[]
    upsert?: ProductoUpsertWithWhereUniqueWithoutProveedorInput | ProductoUpsertWithWhereUniqueWithoutProveedorInput[]
    createMany?: ProductoCreateManyProveedorInputEnvelope
    set?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    disconnect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    delete?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    update?: ProductoUpdateWithWhereUniqueWithoutProveedorInput | ProductoUpdateWithWhereUniqueWithoutProveedorInput[]
    updateMany?: ProductoUpdateManyWithWhereWithoutProveedorInput | ProductoUpdateManyWithWhereWithoutProveedorInput[]
    deleteMany?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
  }

  export type ProductoUncheckedUpdateManyWithoutProveedorNestedInput = {
    create?: XOR<ProductoCreateWithoutProveedorInput, ProductoUncheckedCreateWithoutProveedorInput> | ProductoCreateWithoutProveedorInput[] | ProductoUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutProveedorInput | ProductoCreateOrConnectWithoutProveedorInput[]
    upsert?: ProductoUpsertWithWhereUniqueWithoutProveedorInput | ProductoUpsertWithWhereUniqueWithoutProveedorInput[]
    createMany?: ProductoCreateManyProveedorInputEnvelope
    set?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    disconnect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    delete?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    update?: ProductoUpdateWithWhereUniqueWithoutProveedorInput | ProductoUpdateWithWhereUniqueWithoutProveedorInput[]
    updateMany?: ProductoUpdateManyWithWhereWithoutProveedorInput | ProductoUpdateManyWithWhereWithoutProveedorInput[]
    deleteMany?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
  }

  export type ProductoCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput> | ProductoCreateWithoutCategoriaInput[] | ProductoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaInput | ProductoCreateOrConnectWithoutCategoriaInput[]
    createMany?: ProductoCreateManyCategoriaInputEnvelope
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
  }

  export type ProductoUncheckedCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput> | ProductoCreateWithoutCategoriaInput[] | ProductoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaInput | ProductoCreateOrConnectWithoutCategoriaInput[]
    createMany?: ProductoCreateManyCategoriaInputEnvelope
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
  }

  export type ProductoUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput> | ProductoCreateWithoutCategoriaInput[] | ProductoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaInput | ProductoCreateOrConnectWithoutCategoriaInput[]
    upsert?: ProductoUpsertWithWhereUniqueWithoutCategoriaInput | ProductoUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: ProductoCreateManyCategoriaInputEnvelope
    set?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    disconnect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    delete?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    update?: ProductoUpdateWithWhereUniqueWithoutCategoriaInput | ProductoUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: ProductoUpdateManyWithWhereWithoutCategoriaInput | ProductoUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
  }

  export type ProductoUncheckedUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput> | ProductoCreateWithoutCategoriaInput[] | ProductoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaInput | ProductoCreateOrConnectWithoutCategoriaInput[]
    upsert?: ProductoUpsertWithWhereUniqueWithoutCategoriaInput | ProductoUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: ProductoCreateManyCategoriaInputEnvelope
    set?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    disconnect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    delete?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    update?: ProductoUpdateWithWhereUniqueWithoutCategoriaInput | ProductoUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: ProductoUpdateManyWithWhereWithoutCategoriaInput | ProductoUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
  }

  export type ProveedorCreateNestedOneWithoutProductosInput = {
    create?: XOR<ProveedorCreateWithoutProductosInput, ProveedorUncheckedCreateWithoutProductosInput>
    connectOrCreate?: ProveedorCreateOrConnectWithoutProductosInput
    connect?: ProveedorWhereUniqueInput
  }

  export type CategoriaCreateNestedOneWithoutProductosInput = {
    create?: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutProductosInput
    connect?: CategoriaWhereUniqueInput
  }

  export type DetalleTransaccionCreateNestedManyWithoutProductoInput = {
    create?: XOR<DetalleTransaccionCreateWithoutProductoInput, DetalleTransaccionUncheckedCreateWithoutProductoInput> | DetalleTransaccionCreateWithoutProductoInput[] | DetalleTransaccionUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: DetalleTransaccionCreateOrConnectWithoutProductoInput | DetalleTransaccionCreateOrConnectWithoutProductoInput[]
    createMany?: DetalleTransaccionCreateManyProductoInputEnvelope
    connect?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
  }

  export type DetalleTransaccionUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<DetalleTransaccionCreateWithoutProductoInput, DetalleTransaccionUncheckedCreateWithoutProductoInput> | DetalleTransaccionCreateWithoutProductoInput[] | DetalleTransaccionUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: DetalleTransaccionCreateOrConnectWithoutProductoInput | DetalleTransaccionCreateOrConnectWithoutProductoInput[]
    createMany?: DetalleTransaccionCreateManyProductoInputEnvelope
    connect?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProveedorUpdateOneWithoutProductosNestedInput = {
    create?: XOR<ProveedorCreateWithoutProductosInput, ProveedorUncheckedCreateWithoutProductosInput>
    connectOrCreate?: ProveedorCreateOrConnectWithoutProductosInput
    upsert?: ProveedorUpsertWithoutProductosInput
    disconnect?: ProveedorWhereInput | boolean
    delete?: ProveedorWhereInput | boolean
    connect?: ProveedorWhereUniqueInput
    update?: XOR<XOR<ProveedorUpdateToOneWithWhereWithoutProductosInput, ProveedorUpdateWithoutProductosInput>, ProveedorUncheckedUpdateWithoutProductosInput>
  }

  export type CategoriaUpdateOneWithoutProductosNestedInput = {
    create?: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutProductosInput
    upsert?: CategoriaUpsertWithoutProductosInput
    disconnect?: CategoriaWhereInput | boolean
    delete?: CategoriaWhereInput | boolean
    connect?: CategoriaWhereUniqueInput
    update?: XOR<XOR<CategoriaUpdateToOneWithWhereWithoutProductosInput, CategoriaUpdateWithoutProductosInput>, CategoriaUncheckedUpdateWithoutProductosInput>
  }

  export type DetalleTransaccionUpdateManyWithoutProductoNestedInput = {
    create?: XOR<DetalleTransaccionCreateWithoutProductoInput, DetalleTransaccionUncheckedCreateWithoutProductoInput> | DetalleTransaccionCreateWithoutProductoInput[] | DetalleTransaccionUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: DetalleTransaccionCreateOrConnectWithoutProductoInput | DetalleTransaccionCreateOrConnectWithoutProductoInput[]
    upsert?: DetalleTransaccionUpsertWithWhereUniqueWithoutProductoInput | DetalleTransaccionUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: DetalleTransaccionCreateManyProductoInputEnvelope
    set?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    disconnect?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    delete?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    connect?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    update?: DetalleTransaccionUpdateWithWhereUniqueWithoutProductoInput | DetalleTransaccionUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: DetalleTransaccionUpdateManyWithWhereWithoutProductoInput | DetalleTransaccionUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: DetalleTransaccionScalarWhereInput | DetalleTransaccionScalarWhereInput[]
  }

  export type DetalleTransaccionUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<DetalleTransaccionCreateWithoutProductoInput, DetalleTransaccionUncheckedCreateWithoutProductoInput> | DetalleTransaccionCreateWithoutProductoInput[] | DetalleTransaccionUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: DetalleTransaccionCreateOrConnectWithoutProductoInput | DetalleTransaccionCreateOrConnectWithoutProductoInput[]
    upsert?: DetalleTransaccionUpsertWithWhereUniqueWithoutProductoInput | DetalleTransaccionUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: DetalleTransaccionCreateManyProductoInputEnvelope
    set?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    disconnect?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    delete?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    connect?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    update?: DetalleTransaccionUpdateWithWhereUniqueWithoutProductoInput | DetalleTransaccionUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: DetalleTransaccionUpdateManyWithWhereWithoutProductoInput | DetalleTransaccionUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: DetalleTransaccionScalarWhereInput | DetalleTransaccionScalarWhereInput[]
  }

  export type DetalleTransaccionCreateNestedManyWithoutTransaccionInput = {
    create?: XOR<DetalleTransaccionCreateWithoutTransaccionInput, DetalleTransaccionUncheckedCreateWithoutTransaccionInput> | DetalleTransaccionCreateWithoutTransaccionInput[] | DetalleTransaccionUncheckedCreateWithoutTransaccionInput[]
    connectOrCreate?: DetalleTransaccionCreateOrConnectWithoutTransaccionInput | DetalleTransaccionCreateOrConnectWithoutTransaccionInput[]
    createMany?: DetalleTransaccionCreateManyTransaccionInputEnvelope
    connect?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
  }

  export type PagoCreateNestedManyWithoutTransaccionInput = {
    create?: XOR<PagoCreateWithoutTransaccionInput, PagoUncheckedCreateWithoutTransaccionInput> | PagoCreateWithoutTransaccionInput[] | PagoUncheckedCreateWithoutTransaccionInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutTransaccionInput | PagoCreateOrConnectWithoutTransaccionInput[]
    createMany?: PagoCreateManyTransaccionInputEnvelope
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
  }

  export type DeudaCreditoCreateNestedOneWithoutTransaccionInput = {
    create?: XOR<DeudaCreditoCreateWithoutTransaccionInput, DeudaCreditoUncheckedCreateWithoutTransaccionInput>
    connectOrCreate?: DeudaCreditoCreateOrConnectWithoutTransaccionInput
    connect?: DeudaCreditoWhereUniqueInput
  }

  export type DetalleTransaccionUncheckedCreateNestedManyWithoutTransaccionInput = {
    create?: XOR<DetalleTransaccionCreateWithoutTransaccionInput, DetalleTransaccionUncheckedCreateWithoutTransaccionInput> | DetalleTransaccionCreateWithoutTransaccionInput[] | DetalleTransaccionUncheckedCreateWithoutTransaccionInput[]
    connectOrCreate?: DetalleTransaccionCreateOrConnectWithoutTransaccionInput | DetalleTransaccionCreateOrConnectWithoutTransaccionInput[]
    createMany?: DetalleTransaccionCreateManyTransaccionInputEnvelope
    connect?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
  }

  export type PagoUncheckedCreateNestedManyWithoutTransaccionInput = {
    create?: XOR<PagoCreateWithoutTransaccionInput, PagoUncheckedCreateWithoutTransaccionInput> | PagoCreateWithoutTransaccionInput[] | PagoUncheckedCreateWithoutTransaccionInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutTransaccionInput | PagoCreateOrConnectWithoutTransaccionInput[]
    createMany?: PagoCreateManyTransaccionInputEnvelope
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
  }

  export type DeudaCreditoUncheckedCreateNestedOneWithoutTransaccionInput = {
    create?: XOR<DeudaCreditoCreateWithoutTransaccionInput, DeudaCreditoUncheckedCreateWithoutTransaccionInput>
    connectOrCreate?: DeudaCreditoCreateOrConnectWithoutTransaccionInput
    connect?: DeudaCreditoWhereUniqueInput
  }

  export type DetalleTransaccionUpdateManyWithoutTransaccionNestedInput = {
    create?: XOR<DetalleTransaccionCreateWithoutTransaccionInput, DetalleTransaccionUncheckedCreateWithoutTransaccionInput> | DetalleTransaccionCreateWithoutTransaccionInput[] | DetalleTransaccionUncheckedCreateWithoutTransaccionInput[]
    connectOrCreate?: DetalleTransaccionCreateOrConnectWithoutTransaccionInput | DetalleTransaccionCreateOrConnectWithoutTransaccionInput[]
    upsert?: DetalleTransaccionUpsertWithWhereUniqueWithoutTransaccionInput | DetalleTransaccionUpsertWithWhereUniqueWithoutTransaccionInput[]
    createMany?: DetalleTransaccionCreateManyTransaccionInputEnvelope
    set?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    disconnect?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    delete?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    connect?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    update?: DetalleTransaccionUpdateWithWhereUniqueWithoutTransaccionInput | DetalleTransaccionUpdateWithWhereUniqueWithoutTransaccionInput[]
    updateMany?: DetalleTransaccionUpdateManyWithWhereWithoutTransaccionInput | DetalleTransaccionUpdateManyWithWhereWithoutTransaccionInput[]
    deleteMany?: DetalleTransaccionScalarWhereInput | DetalleTransaccionScalarWhereInput[]
  }

  export type PagoUpdateManyWithoutTransaccionNestedInput = {
    create?: XOR<PagoCreateWithoutTransaccionInput, PagoUncheckedCreateWithoutTransaccionInput> | PagoCreateWithoutTransaccionInput[] | PagoUncheckedCreateWithoutTransaccionInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutTransaccionInput | PagoCreateOrConnectWithoutTransaccionInput[]
    upsert?: PagoUpsertWithWhereUniqueWithoutTransaccionInput | PagoUpsertWithWhereUniqueWithoutTransaccionInput[]
    createMany?: PagoCreateManyTransaccionInputEnvelope
    set?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    disconnect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    delete?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    update?: PagoUpdateWithWhereUniqueWithoutTransaccionInput | PagoUpdateWithWhereUniqueWithoutTransaccionInput[]
    updateMany?: PagoUpdateManyWithWhereWithoutTransaccionInput | PagoUpdateManyWithWhereWithoutTransaccionInput[]
    deleteMany?: PagoScalarWhereInput | PagoScalarWhereInput[]
  }

  export type DeudaCreditoUpdateOneWithoutTransaccionNestedInput = {
    create?: XOR<DeudaCreditoCreateWithoutTransaccionInput, DeudaCreditoUncheckedCreateWithoutTransaccionInput>
    connectOrCreate?: DeudaCreditoCreateOrConnectWithoutTransaccionInput
    upsert?: DeudaCreditoUpsertWithoutTransaccionInput
    disconnect?: DeudaCreditoWhereInput | boolean
    delete?: DeudaCreditoWhereInput | boolean
    connect?: DeudaCreditoWhereUniqueInput
    update?: XOR<XOR<DeudaCreditoUpdateToOneWithWhereWithoutTransaccionInput, DeudaCreditoUpdateWithoutTransaccionInput>, DeudaCreditoUncheckedUpdateWithoutTransaccionInput>
  }

  export type DetalleTransaccionUncheckedUpdateManyWithoutTransaccionNestedInput = {
    create?: XOR<DetalleTransaccionCreateWithoutTransaccionInput, DetalleTransaccionUncheckedCreateWithoutTransaccionInput> | DetalleTransaccionCreateWithoutTransaccionInput[] | DetalleTransaccionUncheckedCreateWithoutTransaccionInput[]
    connectOrCreate?: DetalleTransaccionCreateOrConnectWithoutTransaccionInput | DetalleTransaccionCreateOrConnectWithoutTransaccionInput[]
    upsert?: DetalleTransaccionUpsertWithWhereUniqueWithoutTransaccionInput | DetalleTransaccionUpsertWithWhereUniqueWithoutTransaccionInput[]
    createMany?: DetalleTransaccionCreateManyTransaccionInputEnvelope
    set?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    disconnect?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    delete?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    connect?: DetalleTransaccionWhereUniqueInput | DetalleTransaccionWhereUniqueInput[]
    update?: DetalleTransaccionUpdateWithWhereUniqueWithoutTransaccionInput | DetalleTransaccionUpdateWithWhereUniqueWithoutTransaccionInput[]
    updateMany?: DetalleTransaccionUpdateManyWithWhereWithoutTransaccionInput | DetalleTransaccionUpdateManyWithWhereWithoutTransaccionInput[]
    deleteMany?: DetalleTransaccionScalarWhereInput | DetalleTransaccionScalarWhereInput[]
  }

  export type PagoUncheckedUpdateManyWithoutTransaccionNestedInput = {
    create?: XOR<PagoCreateWithoutTransaccionInput, PagoUncheckedCreateWithoutTransaccionInput> | PagoCreateWithoutTransaccionInput[] | PagoUncheckedCreateWithoutTransaccionInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutTransaccionInput | PagoCreateOrConnectWithoutTransaccionInput[]
    upsert?: PagoUpsertWithWhereUniqueWithoutTransaccionInput | PagoUpsertWithWhereUniqueWithoutTransaccionInput[]
    createMany?: PagoCreateManyTransaccionInputEnvelope
    set?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    disconnect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    delete?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    update?: PagoUpdateWithWhereUniqueWithoutTransaccionInput | PagoUpdateWithWhereUniqueWithoutTransaccionInput[]
    updateMany?: PagoUpdateManyWithWhereWithoutTransaccionInput | PagoUpdateManyWithWhereWithoutTransaccionInput[]
    deleteMany?: PagoScalarWhereInput | PagoScalarWhereInput[]
  }

  export type DeudaCreditoUncheckedUpdateOneWithoutTransaccionNestedInput = {
    create?: XOR<DeudaCreditoCreateWithoutTransaccionInput, DeudaCreditoUncheckedCreateWithoutTransaccionInput>
    connectOrCreate?: DeudaCreditoCreateOrConnectWithoutTransaccionInput
    upsert?: DeudaCreditoUpsertWithoutTransaccionInput
    disconnect?: DeudaCreditoWhereInput | boolean
    delete?: DeudaCreditoWhereInput | boolean
    connect?: DeudaCreditoWhereUniqueInput
    update?: XOR<XOR<DeudaCreditoUpdateToOneWithWhereWithoutTransaccionInput, DeudaCreditoUpdateWithoutTransaccionInput>, DeudaCreditoUncheckedUpdateWithoutTransaccionInput>
  }

  export type TransaccionCreateNestedOneWithoutDetallesInput = {
    create?: XOR<TransaccionCreateWithoutDetallesInput, TransaccionUncheckedCreateWithoutDetallesInput>
    connectOrCreate?: TransaccionCreateOrConnectWithoutDetallesInput
    connect?: TransaccionWhereUniqueInput
  }

  export type ProductoCreateNestedOneWithoutDetallesInput = {
    create?: XOR<ProductoCreateWithoutDetallesInput, ProductoUncheckedCreateWithoutDetallesInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutDetallesInput
    connect?: ProductoWhereUniqueInput
  }

  export type TransaccionUpdateOneRequiredWithoutDetallesNestedInput = {
    create?: XOR<TransaccionCreateWithoutDetallesInput, TransaccionUncheckedCreateWithoutDetallesInput>
    connectOrCreate?: TransaccionCreateOrConnectWithoutDetallesInput
    upsert?: TransaccionUpsertWithoutDetallesInput
    connect?: TransaccionWhereUniqueInput
    update?: XOR<XOR<TransaccionUpdateToOneWithWhereWithoutDetallesInput, TransaccionUpdateWithoutDetallesInput>, TransaccionUncheckedUpdateWithoutDetallesInput>
  }

  export type ProductoUpdateOneRequiredWithoutDetallesNestedInput = {
    create?: XOR<ProductoCreateWithoutDetallesInput, ProductoUncheckedCreateWithoutDetallesInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutDetallesInput
    upsert?: ProductoUpsertWithoutDetallesInput
    connect?: ProductoWhereUniqueInput
    update?: XOR<XOR<ProductoUpdateToOneWithWhereWithoutDetallesInput, ProductoUpdateWithoutDetallesInput>, ProductoUncheckedUpdateWithoutDetallesInput>
  }

  export type TransaccionCreateNestedOneWithoutPagosInput = {
    create?: XOR<TransaccionCreateWithoutPagosInput, TransaccionUncheckedCreateWithoutPagosInput>
    connectOrCreate?: TransaccionCreateOrConnectWithoutPagosInput
    connect?: TransaccionWhereUniqueInput
  }

  export type TransaccionUpdateOneRequiredWithoutPagosNestedInput = {
    create?: XOR<TransaccionCreateWithoutPagosInput, TransaccionUncheckedCreateWithoutPagosInput>
    connectOrCreate?: TransaccionCreateOrConnectWithoutPagosInput
    upsert?: TransaccionUpsertWithoutPagosInput
    connect?: TransaccionWhereUniqueInput
    update?: XOR<XOR<TransaccionUpdateToOneWithWhereWithoutPagosInput, TransaccionUpdateWithoutPagosInput>, TransaccionUncheckedUpdateWithoutPagosInput>
  }

  export type TransaccionCreateNestedOneWithoutDeudaCreditoInput = {
    create?: XOR<TransaccionCreateWithoutDeudaCreditoInput, TransaccionUncheckedCreateWithoutDeudaCreditoInput>
    connectOrCreate?: TransaccionCreateOrConnectWithoutDeudaCreditoInput
    connect?: TransaccionWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TransaccionUpdateOneRequiredWithoutDeudaCreditoNestedInput = {
    create?: XOR<TransaccionCreateWithoutDeudaCreditoInput, TransaccionUncheckedCreateWithoutDeudaCreditoInput>
    connectOrCreate?: TransaccionCreateOrConnectWithoutDeudaCreditoInput
    upsert?: TransaccionUpsertWithoutDeudaCreditoInput
    connect?: TransaccionWhereUniqueInput
    update?: XOR<XOR<TransaccionUpdateToOneWithWhereWithoutDeudaCreditoInput, TransaccionUpdateWithoutDeudaCreditoInput>, TransaccionUncheckedUpdateWithoutDeudaCreditoInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProductoCreateWithoutProveedorInput = {
    codigo: string
    nombre?: string
    descripcion: string
    marca: string
    unidadMedida?: string
    stock?: number
    costo: number
    precioVenta: number
    metodoInventario?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    categoria?: CategoriaCreateNestedOneWithoutProductosInput
    detalles?: DetalleTransaccionCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateWithoutProveedorInput = {
    codigo: string
    nombre?: string
    descripcion: string
    marca: string
    unidadMedida?: string
    stock?: number
    costo: number
    precioVenta: number
    metodoInventario?: string
    activo?: boolean
    categoriaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    detalles?: DetalleTransaccionUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutProveedorInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutProveedorInput, ProductoUncheckedCreateWithoutProveedorInput>
  }

  export type ProductoCreateManyProveedorInputEnvelope = {
    data: ProductoCreateManyProveedorInput | ProductoCreateManyProveedorInput[]
    skipDuplicates?: boolean
  }

  export type ProductoUpsertWithWhereUniqueWithoutProveedorInput = {
    where: ProductoWhereUniqueInput
    update: XOR<ProductoUpdateWithoutProveedorInput, ProductoUncheckedUpdateWithoutProveedorInput>
    create: XOR<ProductoCreateWithoutProveedorInput, ProductoUncheckedCreateWithoutProveedorInput>
  }

  export type ProductoUpdateWithWhereUniqueWithoutProveedorInput = {
    where: ProductoWhereUniqueInput
    data: XOR<ProductoUpdateWithoutProveedorInput, ProductoUncheckedUpdateWithoutProveedorInput>
  }

  export type ProductoUpdateManyWithWhereWithoutProveedorInput = {
    where: ProductoScalarWhereInput
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyWithoutProveedorInput>
  }

  export type ProductoScalarWhereInput = {
    AND?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
    OR?: ProductoScalarWhereInput[]
    NOT?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
    codigo?: StringFilter<"Producto"> | string
    proveedorId?: StringNullableFilter<"Producto"> | string | null
    nombre?: StringFilter<"Producto"> | string
    descripcion?: StringFilter<"Producto"> | string
    marca?: StringFilter<"Producto"> | string
    unidadMedida?: StringFilter<"Producto"> | string
    stock?: IntFilter<"Producto"> | number
    costo?: FloatFilter<"Producto"> | number
    precioVenta?: FloatFilter<"Producto"> | number
    metodoInventario?: StringFilter<"Producto"> | string
    activo?: BoolFilter<"Producto"> | boolean
    categoriaId?: StringNullableFilter<"Producto"> | string | null
    createdAt?: DateTimeFilter<"Producto"> | Date | string
    updatedAt?: DateTimeFilter<"Producto"> | Date | string
  }

  export type ProductoCreateWithoutCategoriaInput = {
    codigo: string
    nombre?: string
    descripcion: string
    marca: string
    unidadMedida?: string
    stock?: number
    costo: number
    precioVenta: number
    metodoInventario?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    proveedor?: ProveedorCreateNestedOneWithoutProductosInput
    detalles?: DetalleTransaccionCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateWithoutCategoriaInput = {
    codigo: string
    proveedorId?: string | null
    nombre?: string
    descripcion: string
    marca: string
    unidadMedida?: string
    stock?: number
    costo: number
    precioVenta: number
    metodoInventario?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    detalles?: DetalleTransaccionUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutCategoriaInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput>
  }

  export type ProductoCreateManyCategoriaInputEnvelope = {
    data: ProductoCreateManyCategoriaInput | ProductoCreateManyCategoriaInput[]
    skipDuplicates?: boolean
  }

  export type ProductoUpsertWithWhereUniqueWithoutCategoriaInput = {
    where: ProductoWhereUniqueInput
    update: XOR<ProductoUpdateWithoutCategoriaInput, ProductoUncheckedUpdateWithoutCategoriaInput>
    create: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput>
  }

  export type ProductoUpdateWithWhereUniqueWithoutCategoriaInput = {
    where: ProductoWhereUniqueInput
    data: XOR<ProductoUpdateWithoutCategoriaInput, ProductoUncheckedUpdateWithoutCategoriaInput>
  }

  export type ProductoUpdateManyWithWhereWithoutCategoriaInput = {
    where: ProductoScalarWhereInput
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyWithoutCategoriaInput>
  }

  export type ProveedorCreateWithoutProductosInput = {
    id?: string
    nombre: string
    nit: string
    responsable?: string | null
    telefono?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProveedorUncheckedCreateWithoutProductosInput = {
    id?: string
    nombre: string
    nit: string
    responsable?: string | null
    telefono?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProveedorCreateOrConnectWithoutProductosInput = {
    where: ProveedorWhereUniqueInput
    create: XOR<ProveedorCreateWithoutProductosInput, ProveedorUncheckedCreateWithoutProductosInput>
  }

  export type CategoriaCreateWithoutProductosInput = {
    id?: string
    nombre: string
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoriaUncheckedCreateWithoutProductosInput = {
    id?: string
    nombre: string
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoriaCreateOrConnectWithoutProductosInput = {
    where: CategoriaWhereUniqueInput
    create: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
  }

  export type DetalleTransaccionCreateWithoutProductoInput = {
    id?: string
    cantidad: number
    precioUnitario: number
    subtotal: number
    transaccion: TransaccionCreateNestedOneWithoutDetallesInput
  }

  export type DetalleTransaccionUncheckedCreateWithoutProductoInput = {
    id?: string
    transaccionId: string
    cantidad: number
    precioUnitario: number
    subtotal: number
  }

  export type DetalleTransaccionCreateOrConnectWithoutProductoInput = {
    where: DetalleTransaccionWhereUniqueInput
    create: XOR<DetalleTransaccionCreateWithoutProductoInput, DetalleTransaccionUncheckedCreateWithoutProductoInput>
  }

  export type DetalleTransaccionCreateManyProductoInputEnvelope = {
    data: DetalleTransaccionCreateManyProductoInput | DetalleTransaccionCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type ProveedorUpsertWithoutProductosInput = {
    update: XOR<ProveedorUpdateWithoutProductosInput, ProveedorUncheckedUpdateWithoutProductosInput>
    create: XOR<ProveedorCreateWithoutProductosInput, ProveedorUncheckedCreateWithoutProductosInput>
    where?: ProveedorWhereInput
  }

  export type ProveedorUpdateToOneWithWhereWithoutProductosInput = {
    where?: ProveedorWhereInput
    data: XOR<ProveedorUpdateWithoutProductosInput, ProveedorUncheckedUpdateWithoutProductosInput>
  }

  export type ProveedorUpdateWithoutProductosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    nit?: StringFieldUpdateOperationsInput | string
    responsable?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProveedorUncheckedUpdateWithoutProductosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    nit?: StringFieldUpdateOperationsInput | string
    responsable?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaUpsertWithoutProductosInput = {
    update: XOR<CategoriaUpdateWithoutProductosInput, CategoriaUncheckedUpdateWithoutProductosInput>
    create: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
    where?: CategoriaWhereInput
  }

  export type CategoriaUpdateToOneWithWhereWithoutProductosInput = {
    where?: CategoriaWhereInput
    data: XOR<CategoriaUpdateWithoutProductosInput, CategoriaUncheckedUpdateWithoutProductosInput>
  }

  export type CategoriaUpdateWithoutProductosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaUncheckedUpdateWithoutProductosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DetalleTransaccionUpsertWithWhereUniqueWithoutProductoInput = {
    where: DetalleTransaccionWhereUniqueInput
    update: XOR<DetalleTransaccionUpdateWithoutProductoInput, DetalleTransaccionUncheckedUpdateWithoutProductoInput>
    create: XOR<DetalleTransaccionCreateWithoutProductoInput, DetalleTransaccionUncheckedCreateWithoutProductoInput>
  }

  export type DetalleTransaccionUpdateWithWhereUniqueWithoutProductoInput = {
    where: DetalleTransaccionWhereUniqueInput
    data: XOR<DetalleTransaccionUpdateWithoutProductoInput, DetalleTransaccionUncheckedUpdateWithoutProductoInput>
  }

  export type DetalleTransaccionUpdateManyWithWhereWithoutProductoInput = {
    where: DetalleTransaccionScalarWhereInput
    data: XOR<DetalleTransaccionUpdateManyMutationInput, DetalleTransaccionUncheckedUpdateManyWithoutProductoInput>
  }

  export type DetalleTransaccionScalarWhereInput = {
    AND?: DetalleTransaccionScalarWhereInput | DetalleTransaccionScalarWhereInput[]
    OR?: DetalleTransaccionScalarWhereInput[]
    NOT?: DetalleTransaccionScalarWhereInput | DetalleTransaccionScalarWhereInput[]
    id?: StringFilter<"DetalleTransaccion"> | string
    transaccionId?: StringFilter<"DetalleTransaccion"> | string
    productoCodigo?: StringFilter<"DetalleTransaccion"> | string
    cantidad?: IntFilter<"DetalleTransaccion"> | number
    precioUnitario?: FloatFilter<"DetalleTransaccion"> | number
    subtotal?: FloatFilter<"DetalleTransaccion"> | number
  }

  export type DetalleTransaccionCreateWithoutTransaccionInput = {
    id?: string
    cantidad: number
    precioUnitario: number
    subtotal: number
    producto: ProductoCreateNestedOneWithoutDetallesInput
  }

  export type DetalleTransaccionUncheckedCreateWithoutTransaccionInput = {
    id?: string
    productoCodigo: string
    cantidad: number
    precioUnitario: number
    subtotal: number
  }

  export type DetalleTransaccionCreateOrConnectWithoutTransaccionInput = {
    where: DetalleTransaccionWhereUniqueInput
    create: XOR<DetalleTransaccionCreateWithoutTransaccionInput, DetalleTransaccionUncheckedCreateWithoutTransaccionInput>
  }

  export type DetalleTransaccionCreateManyTransaccionInputEnvelope = {
    data: DetalleTransaccionCreateManyTransaccionInput | DetalleTransaccionCreateManyTransaccionInput[]
    skipDuplicates?: boolean
  }

  export type PagoCreateWithoutTransaccionInput = {
    id?: string
    monto: number
    fecha?: Date | string
    observaciones?: string | null
  }

  export type PagoUncheckedCreateWithoutTransaccionInput = {
    id?: string
    monto: number
    fecha?: Date | string
    observaciones?: string | null
  }

  export type PagoCreateOrConnectWithoutTransaccionInput = {
    where: PagoWhereUniqueInput
    create: XOR<PagoCreateWithoutTransaccionInput, PagoUncheckedCreateWithoutTransaccionInput>
  }

  export type PagoCreateManyTransaccionInputEnvelope = {
    data: PagoCreateManyTransaccionInput | PagoCreateManyTransaccionInput[]
    skipDuplicates?: boolean
  }

  export type DeudaCreditoCreateWithoutTransaccionInput = {
    id?: string
    montoTotal: number
    saldoPendiente: number
    estado?: string
    fechaVencimiento?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeudaCreditoUncheckedCreateWithoutTransaccionInput = {
    id?: string
    montoTotal: number
    saldoPendiente: number
    estado?: string
    fechaVencimiento?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeudaCreditoCreateOrConnectWithoutTransaccionInput = {
    where: DeudaCreditoWhereUniqueInput
    create: XOR<DeudaCreditoCreateWithoutTransaccionInput, DeudaCreditoUncheckedCreateWithoutTransaccionInput>
  }

  export type DetalleTransaccionUpsertWithWhereUniqueWithoutTransaccionInput = {
    where: DetalleTransaccionWhereUniqueInput
    update: XOR<DetalleTransaccionUpdateWithoutTransaccionInput, DetalleTransaccionUncheckedUpdateWithoutTransaccionInput>
    create: XOR<DetalleTransaccionCreateWithoutTransaccionInput, DetalleTransaccionUncheckedCreateWithoutTransaccionInput>
  }

  export type DetalleTransaccionUpdateWithWhereUniqueWithoutTransaccionInput = {
    where: DetalleTransaccionWhereUniqueInput
    data: XOR<DetalleTransaccionUpdateWithoutTransaccionInput, DetalleTransaccionUncheckedUpdateWithoutTransaccionInput>
  }

  export type DetalleTransaccionUpdateManyWithWhereWithoutTransaccionInput = {
    where: DetalleTransaccionScalarWhereInput
    data: XOR<DetalleTransaccionUpdateManyMutationInput, DetalleTransaccionUncheckedUpdateManyWithoutTransaccionInput>
  }

  export type PagoUpsertWithWhereUniqueWithoutTransaccionInput = {
    where: PagoWhereUniqueInput
    update: XOR<PagoUpdateWithoutTransaccionInput, PagoUncheckedUpdateWithoutTransaccionInput>
    create: XOR<PagoCreateWithoutTransaccionInput, PagoUncheckedCreateWithoutTransaccionInput>
  }

  export type PagoUpdateWithWhereUniqueWithoutTransaccionInput = {
    where: PagoWhereUniqueInput
    data: XOR<PagoUpdateWithoutTransaccionInput, PagoUncheckedUpdateWithoutTransaccionInput>
  }

  export type PagoUpdateManyWithWhereWithoutTransaccionInput = {
    where: PagoScalarWhereInput
    data: XOR<PagoUpdateManyMutationInput, PagoUncheckedUpdateManyWithoutTransaccionInput>
  }

  export type PagoScalarWhereInput = {
    AND?: PagoScalarWhereInput | PagoScalarWhereInput[]
    OR?: PagoScalarWhereInput[]
    NOT?: PagoScalarWhereInput | PagoScalarWhereInput[]
    id?: StringFilter<"Pago"> | string
    transaccionId?: StringFilter<"Pago"> | string
    monto?: FloatFilter<"Pago"> | number
    fecha?: DateTimeFilter<"Pago"> | Date | string
    observaciones?: StringNullableFilter<"Pago"> | string | null
  }

  export type DeudaCreditoUpsertWithoutTransaccionInput = {
    update: XOR<DeudaCreditoUpdateWithoutTransaccionInput, DeudaCreditoUncheckedUpdateWithoutTransaccionInput>
    create: XOR<DeudaCreditoCreateWithoutTransaccionInput, DeudaCreditoUncheckedCreateWithoutTransaccionInput>
    where?: DeudaCreditoWhereInput
  }

  export type DeudaCreditoUpdateToOneWithWhereWithoutTransaccionInput = {
    where?: DeudaCreditoWhereInput
    data: XOR<DeudaCreditoUpdateWithoutTransaccionInput, DeudaCreditoUncheckedUpdateWithoutTransaccionInput>
  }

  export type DeudaCreditoUpdateWithoutTransaccionInput = {
    id?: StringFieldUpdateOperationsInput | string
    montoTotal?: FloatFieldUpdateOperationsInput | number
    saldoPendiente?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeudaCreditoUncheckedUpdateWithoutTransaccionInput = {
    id?: StringFieldUpdateOperationsInput | string
    montoTotal?: FloatFieldUpdateOperationsInput | number
    saldoPendiente?: FloatFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransaccionCreateWithoutDetallesInput = {
    id?: string
    tipoTransaccion: string
    nroDocumento: string
    fecha?: Date | string
    nitCi: string
    razonSocial: string
    formaPago?: string
    descuento?: number
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pagos?: PagoCreateNestedManyWithoutTransaccionInput
    deudaCredito?: DeudaCreditoCreateNestedOneWithoutTransaccionInput
  }

  export type TransaccionUncheckedCreateWithoutDetallesInput = {
    id?: string
    tipoTransaccion: string
    nroDocumento: string
    fecha?: Date | string
    nitCi: string
    razonSocial: string
    formaPago?: string
    descuento?: number
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pagos?: PagoUncheckedCreateNestedManyWithoutTransaccionInput
    deudaCredito?: DeudaCreditoUncheckedCreateNestedOneWithoutTransaccionInput
  }

  export type TransaccionCreateOrConnectWithoutDetallesInput = {
    where: TransaccionWhereUniqueInput
    create: XOR<TransaccionCreateWithoutDetallesInput, TransaccionUncheckedCreateWithoutDetallesInput>
  }

  export type ProductoCreateWithoutDetallesInput = {
    codigo: string
    nombre?: string
    descripcion: string
    marca: string
    unidadMedida?: string
    stock?: number
    costo: number
    precioVenta: number
    metodoInventario?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    proveedor?: ProveedorCreateNestedOneWithoutProductosInput
    categoria?: CategoriaCreateNestedOneWithoutProductosInput
  }

  export type ProductoUncheckedCreateWithoutDetallesInput = {
    codigo: string
    proveedorId?: string | null
    nombre?: string
    descripcion: string
    marca: string
    unidadMedida?: string
    stock?: number
    costo: number
    precioVenta: number
    metodoInventario?: string
    activo?: boolean
    categoriaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductoCreateOrConnectWithoutDetallesInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutDetallesInput, ProductoUncheckedCreateWithoutDetallesInput>
  }

  export type TransaccionUpsertWithoutDetallesInput = {
    update: XOR<TransaccionUpdateWithoutDetallesInput, TransaccionUncheckedUpdateWithoutDetallesInput>
    create: XOR<TransaccionCreateWithoutDetallesInput, TransaccionUncheckedCreateWithoutDetallesInput>
    where?: TransaccionWhereInput
  }

  export type TransaccionUpdateToOneWithWhereWithoutDetallesInput = {
    where?: TransaccionWhereInput
    data: XOR<TransaccionUpdateWithoutDetallesInput, TransaccionUncheckedUpdateWithoutDetallesInput>
  }

  export type TransaccionUpdateWithoutDetallesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoTransaccion?: StringFieldUpdateOperationsInput | string
    nroDocumento?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    nitCi?: StringFieldUpdateOperationsInput | string
    razonSocial?: StringFieldUpdateOperationsInput | string
    formaPago?: StringFieldUpdateOperationsInput | string
    descuento?: FloatFieldUpdateOperationsInput | number
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pagos?: PagoUpdateManyWithoutTransaccionNestedInput
    deudaCredito?: DeudaCreditoUpdateOneWithoutTransaccionNestedInput
  }

  export type TransaccionUncheckedUpdateWithoutDetallesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoTransaccion?: StringFieldUpdateOperationsInput | string
    nroDocumento?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    nitCi?: StringFieldUpdateOperationsInput | string
    razonSocial?: StringFieldUpdateOperationsInput | string
    formaPago?: StringFieldUpdateOperationsInput | string
    descuento?: FloatFieldUpdateOperationsInput | number
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pagos?: PagoUncheckedUpdateManyWithoutTransaccionNestedInput
    deudaCredito?: DeudaCreditoUncheckedUpdateOneWithoutTransaccionNestedInput
  }

  export type ProductoUpsertWithoutDetallesInput = {
    update: XOR<ProductoUpdateWithoutDetallesInput, ProductoUncheckedUpdateWithoutDetallesInput>
    create: XOR<ProductoCreateWithoutDetallesInput, ProductoUncheckedCreateWithoutDetallesInput>
    where?: ProductoWhereInput
  }

  export type ProductoUpdateToOneWithWhereWithoutDetallesInput = {
    where?: ProductoWhereInput
    data: XOR<ProductoUpdateWithoutDetallesInput, ProductoUncheckedUpdateWithoutDetallesInput>
  }

  export type ProductoUpdateWithoutDetallesInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    unidadMedida?: StringFieldUpdateOperationsInput | string
    stock?: IntFieldUpdateOperationsInput | number
    costo?: FloatFieldUpdateOperationsInput | number
    precioVenta?: FloatFieldUpdateOperationsInput | number
    metodoInventario?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proveedor?: ProveedorUpdateOneWithoutProductosNestedInput
    categoria?: CategoriaUpdateOneWithoutProductosNestedInput
  }

  export type ProductoUncheckedUpdateWithoutDetallesInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    proveedorId?: NullableStringFieldUpdateOperationsInput | string | null
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    unidadMedida?: StringFieldUpdateOperationsInput | string
    stock?: IntFieldUpdateOperationsInput | number
    costo?: FloatFieldUpdateOperationsInput | number
    precioVenta?: FloatFieldUpdateOperationsInput | number
    metodoInventario?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    categoriaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransaccionCreateWithoutPagosInput = {
    id?: string
    tipoTransaccion: string
    nroDocumento: string
    fecha?: Date | string
    nitCi: string
    razonSocial: string
    formaPago?: string
    descuento?: number
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    detalles?: DetalleTransaccionCreateNestedManyWithoutTransaccionInput
    deudaCredito?: DeudaCreditoCreateNestedOneWithoutTransaccionInput
  }

  export type TransaccionUncheckedCreateWithoutPagosInput = {
    id?: string
    tipoTransaccion: string
    nroDocumento: string
    fecha?: Date | string
    nitCi: string
    razonSocial: string
    formaPago?: string
    descuento?: number
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    detalles?: DetalleTransaccionUncheckedCreateNestedManyWithoutTransaccionInput
    deudaCredito?: DeudaCreditoUncheckedCreateNestedOneWithoutTransaccionInput
  }

  export type TransaccionCreateOrConnectWithoutPagosInput = {
    where: TransaccionWhereUniqueInput
    create: XOR<TransaccionCreateWithoutPagosInput, TransaccionUncheckedCreateWithoutPagosInput>
  }

  export type TransaccionUpsertWithoutPagosInput = {
    update: XOR<TransaccionUpdateWithoutPagosInput, TransaccionUncheckedUpdateWithoutPagosInput>
    create: XOR<TransaccionCreateWithoutPagosInput, TransaccionUncheckedCreateWithoutPagosInput>
    where?: TransaccionWhereInput
  }

  export type TransaccionUpdateToOneWithWhereWithoutPagosInput = {
    where?: TransaccionWhereInput
    data: XOR<TransaccionUpdateWithoutPagosInput, TransaccionUncheckedUpdateWithoutPagosInput>
  }

  export type TransaccionUpdateWithoutPagosInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoTransaccion?: StringFieldUpdateOperationsInput | string
    nroDocumento?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    nitCi?: StringFieldUpdateOperationsInput | string
    razonSocial?: StringFieldUpdateOperationsInput | string
    formaPago?: StringFieldUpdateOperationsInput | string
    descuento?: FloatFieldUpdateOperationsInput | number
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleTransaccionUpdateManyWithoutTransaccionNestedInput
    deudaCredito?: DeudaCreditoUpdateOneWithoutTransaccionNestedInput
  }

  export type TransaccionUncheckedUpdateWithoutPagosInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoTransaccion?: StringFieldUpdateOperationsInput | string
    nroDocumento?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    nitCi?: StringFieldUpdateOperationsInput | string
    razonSocial?: StringFieldUpdateOperationsInput | string
    formaPago?: StringFieldUpdateOperationsInput | string
    descuento?: FloatFieldUpdateOperationsInput | number
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleTransaccionUncheckedUpdateManyWithoutTransaccionNestedInput
    deudaCredito?: DeudaCreditoUncheckedUpdateOneWithoutTransaccionNestedInput
  }

  export type TransaccionCreateWithoutDeudaCreditoInput = {
    id?: string
    tipoTransaccion: string
    nroDocumento: string
    fecha?: Date | string
    nitCi: string
    razonSocial: string
    formaPago?: string
    descuento?: number
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    detalles?: DetalleTransaccionCreateNestedManyWithoutTransaccionInput
    pagos?: PagoCreateNestedManyWithoutTransaccionInput
  }

  export type TransaccionUncheckedCreateWithoutDeudaCreditoInput = {
    id?: string
    tipoTransaccion: string
    nroDocumento: string
    fecha?: Date | string
    nitCi: string
    razonSocial: string
    formaPago?: string
    descuento?: number
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    detalles?: DetalleTransaccionUncheckedCreateNestedManyWithoutTransaccionInput
    pagos?: PagoUncheckedCreateNestedManyWithoutTransaccionInput
  }

  export type TransaccionCreateOrConnectWithoutDeudaCreditoInput = {
    where: TransaccionWhereUniqueInput
    create: XOR<TransaccionCreateWithoutDeudaCreditoInput, TransaccionUncheckedCreateWithoutDeudaCreditoInput>
  }

  export type TransaccionUpsertWithoutDeudaCreditoInput = {
    update: XOR<TransaccionUpdateWithoutDeudaCreditoInput, TransaccionUncheckedUpdateWithoutDeudaCreditoInput>
    create: XOR<TransaccionCreateWithoutDeudaCreditoInput, TransaccionUncheckedCreateWithoutDeudaCreditoInput>
    where?: TransaccionWhereInput
  }

  export type TransaccionUpdateToOneWithWhereWithoutDeudaCreditoInput = {
    where?: TransaccionWhereInput
    data: XOR<TransaccionUpdateWithoutDeudaCreditoInput, TransaccionUncheckedUpdateWithoutDeudaCreditoInput>
  }

  export type TransaccionUpdateWithoutDeudaCreditoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoTransaccion?: StringFieldUpdateOperationsInput | string
    nroDocumento?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    nitCi?: StringFieldUpdateOperationsInput | string
    razonSocial?: StringFieldUpdateOperationsInput | string
    formaPago?: StringFieldUpdateOperationsInput | string
    descuento?: FloatFieldUpdateOperationsInput | number
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleTransaccionUpdateManyWithoutTransaccionNestedInput
    pagos?: PagoUpdateManyWithoutTransaccionNestedInput
  }

  export type TransaccionUncheckedUpdateWithoutDeudaCreditoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoTransaccion?: StringFieldUpdateOperationsInput | string
    nroDocumento?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    nitCi?: StringFieldUpdateOperationsInput | string
    razonSocial?: StringFieldUpdateOperationsInput | string
    formaPago?: StringFieldUpdateOperationsInput | string
    descuento?: FloatFieldUpdateOperationsInput | number
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleTransaccionUncheckedUpdateManyWithoutTransaccionNestedInput
    pagos?: PagoUncheckedUpdateManyWithoutTransaccionNestedInput
  }

  export type ProductoCreateManyProveedorInput = {
    codigo: string
    nombre?: string
    descripcion: string
    marca: string
    unidadMedida?: string
    stock?: number
    costo: number
    precioVenta: number
    metodoInventario?: string
    activo?: boolean
    categoriaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductoUpdateWithoutProveedorInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    unidadMedida?: StringFieldUpdateOperationsInput | string
    stock?: IntFieldUpdateOperationsInput | number
    costo?: FloatFieldUpdateOperationsInput | number
    precioVenta?: FloatFieldUpdateOperationsInput | number
    metodoInventario?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: CategoriaUpdateOneWithoutProductosNestedInput
    detalles?: DetalleTransaccionUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateWithoutProveedorInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    unidadMedida?: StringFieldUpdateOperationsInput | string
    stock?: IntFieldUpdateOperationsInput | number
    costo?: FloatFieldUpdateOperationsInput | number
    precioVenta?: FloatFieldUpdateOperationsInput | number
    metodoInventario?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    categoriaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleTransaccionUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateManyWithoutProveedorInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    unidadMedida?: StringFieldUpdateOperationsInput | string
    stock?: IntFieldUpdateOperationsInput | number
    costo?: FloatFieldUpdateOperationsInput | number
    precioVenta?: FloatFieldUpdateOperationsInput | number
    metodoInventario?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    categoriaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductoCreateManyCategoriaInput = {
    codigo: string
    proveedorId?: string | null
    nombre?: string
    descripcion: string
    marca: string
    unidadMedida?: string
    stock?: number
    costo: number
    precioVenta: number
    metodoInventario?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductoUpdateWithoutCategoriaInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    unidadMedida?: StringFieldUpdateOperationsInput | string
    stock?: IntFieldUpdateOperationsInput | number
    costo?: FloatFieldUpdateOperationsInput | number
    precioVenta?: FloatFieldUpdateOperationsInput | number
    metodoInventario?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proveedor?: ProveedorUpdateOneWithoutProductosNestedInput
    detalles?: DetalleTransaccionUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateWithoutCategoriaInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    proveedorId?: NullableStringFieldUpdateOperationsInput | string | null
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    unidadMedida?: StringFieldUpdateOperationsInput | string
    stock?: IntFieldUpdateOperationsInput | number
    costo?: FloatFieldUpdateOperationsInput | number
    precioVenta?: FloatFieldUpdateOperationsInput | number
    metodoInventario?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleTransaccionUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateManyWithoutCategoriaInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    proveedorId?: NullableStringFieldUpdateOperationsInput | string | null
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    unidadMedida?: StringFieldUpdateOperationsInput | string
    stock?: IntFieldUpdateOperationsInput | number
    costo?: FloatFieldUpdateOperationsInput | number
    precioVenta?: FloatFieldUpdateOperationsInput | number
    metodoInventario?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DetalleTransaccionCreateManyProductoInput = {
    id?: string
    transaccionId: string
    cantidad: number
    precioUnitario: number
    subtotal: number
  }

  export type DetalleTransaccionUpdateWithoutProductoInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    transaccion?: TransaccionUpdateOneRequiredWithoutDetallesNestedInput
  }

  export type DetalleTransaccionUncheckedUpdateWithoutProductoInput = {
    id?: StringFieldUpdateOperationsInput | string
    transaccionId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
  }

  export type DetalleTransaccionUncheckedUpdateManyWithoutProductoInput = {
    id?: StringFieldUpdateOperationsInput | string
    transaccionId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
  }

  export type DetalleTransaccionCreateManyTransaccionInput = {
    id?: string
    productoCodigo: string
    cantidad: number
    precioUnitario: number
    subtotal: number
  }

  export type PagoCreateManyTransaccionInput = {
    id?: string
    monto: number
    fecha?: Date | string
    observaciones?: string | null
  }

  export type DetalleTransaccionUpdateWithoutTransaccionInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    producto?: ProductoUpdateOneRequiredWithoutDetallesNestedInput
  }

  export type DetalleTransaccionUncheckedUpdateWithoutTransaccionInput = {
    id?: StringFieldUpdateOperationsInput | string
    productoCodigo?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
  }

  export type DetalleTransaccionUncheckedUpdateManyWithoutTransaccionInput = {
    id?: StringFieldUpdateOperationsInput | string
    productoCodigo?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
  }

  export type PagoUpdateWithoutTransaccionInput = {
    id?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PagoUncheckedUpdateWithoutTransaccionInput = {
    id?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PagoUncheckedUpdateManyWithoutTransaccionInput = {
    id?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ProveedorCountOutputTypeDefaultArgs instead
     */
    export type ProveedorCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProveedorCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoriaCountOutputTypeDefaultArgs instead
     */
    export type CategoriaCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoriaCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductoCountOutputTypeDefaultArgs instead
     */
    export type ProductoCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductoCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TransaccionCountOutputTypeDefaultArgs instead
     */
    export type TransaccionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TransaccionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProveedorDefaultArgs instead
     */
    export type ProveedorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProveedorDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoriaDefaultArgs instead
     */
    export type CategoriaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoriaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductoDefaultArgs instead
     */
    export type ProductoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TransaccionDefaultArgs instead
     */
    export type TransaccionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TransaccionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DetalleTransaccionDefaultArgs instead
     */
    export type DetalleTransaccionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DetalleTransaccionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PagoDefaultArgs instead
     */
    export type PagoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PagoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeudaCreditoDefaultArgs instead
     */
    export type DeudaCreditoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeudaCreditoDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}