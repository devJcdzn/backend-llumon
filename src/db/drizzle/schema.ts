import { numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  cpf: text("cpf").unique(),
  surname: text("surname").notNull(),
  email: text("email").notNull().unique(),

  otCode: text("otp_code"),
  validatedEmailAt: timestamp("validated_email_at", { withTimezone: true }),

  apiKey: text("api_key").unique(),
  preferredGateway: text("preferred_gateway"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").default("pix"), // pix, boleto, cartao
  gatewayUsed: text("gateway_used"), // Mercado Pago, Efi, Stripe, etc.

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const payments = pgTable("payments", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  transactionId: text("transaction_id")
    .references(() => transactions.id, { onDelete: "cascade" })
    .notNull(),

  status: text("status").default("pending"), // pending, completed, failed
  paymentMethod: text("payment_method").default("pix"), // pix, boleto, cartao

  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  payerName: text("payer_name"),
  paymentCode: text("payment_code"),

  errorMessage: text("error_message"), // Armazena motivo da falha

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const paymentAttempts = pgTable("payment_attempts", {
  id: text("id").primaryKey(),
  paymentId: text("payment_id")
    .references(() => payments.id, { onDelete: "cascade" })
    .notNull(),

  gatewayUsed: text("gateway_used"), // Qual gateway foi tentado
  status: text("status").default("failed"), // failed, success
  errorMessage: text("error_message"), // Motivo da falha

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
