DO $$
DECLARE
    s record;
BEGIN
    FOR s IN SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'tenant_%'
    LOOP
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_dt_transaccion ON %I."DetalleTransaccion" ("transaccionId");', s.schema_name);
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_dt_producto ON %I."DetalleTransaccion" ("productoCodigo");', s.schema_name);
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_tx_fecha ON %I."Transaccion" ("fecha" DESC);', s.schema_name);
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_tx_tipo ON %I."Transaccion" ("tipoTransaccion");', s.schema_name);
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_tx_nrodoc ON %I."Transaccion" ("nroDocumento");', s.schema_name);
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_pago_tx ON %I."Pago" ("transaccionId");', s.schema_name);
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_pago_fecha ON %I."Pago" ("fecha");', s.schema_name);
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_prod_activo ON %I."Producto" ("activo");', s.schema_name);
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_prod_nombre ON %I."Producto" ("nombre");', s.schema_name);
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_prod_cat ON %I."Producto" ("categoriaId");', s.schema_name);
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_prod_prov ON %I."Producto" ("proveedorId");', s.schema_name);
    END LOOP;

    CREATE INDEX IF NOT EXISTS idx_tu_user ON public."TenantUser" ("userId");
    CREATE INDEX IF NOT EXISTS idx_tu_tenant ON public."TenantUser" ("tenantId");
END
$$;
