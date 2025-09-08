import { Client } from "@neondatabase/serverless";

export interface Variant {
    id: number;
    title: string;
    sku: string;
    created_at: string;
    updated_at: string | null;
}

export interface Product {
    id: number;
    title: string;
    tags?: string[];
    variants: Variant[];
}

export async function initProductsTable(client: Client) {
    return client.query(`
        CREATE TABLE IF NOT EXISTS products(
            id BIGINT PRIMARY KEY,
            product_id BIGINT NOT NULL,
            title TEXT NOT NULL,
            tags TEXT[],
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NULL,
            sku TEXT NOT NULL)`)
}


export async function insertProducts(client: Client, product: Product) {
    const { id, title, tags, variants } = product;
    let count = 0;
    for (const variant of variants) {
       await client.query(
            `INSERT INTO products (id, product_id, title, tags, created_at, updated_at, sku)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (id) DO NOTHING
            `,
            [
                variant.id,
                id,
                `${title} ${variant.title}`,
                Array.isArray(tags) ? tags : (tags ? tags.split(",") : []),
                variant.created_at,
                variant.updated_at,
                variant.sku,
            ]
        );
        count++;
    }
    return count;
}


export async function AllProduct(client: Client){
    const res = await client.query(`SELECT * FROM products`);
    return res.rows;
}

export async function deleteProducts(client: Client, product_id: number) {
    const res = await client.query(`DELETE FROM products WHERE product_id = $1 RETURNING *`,[product_id]);
    return res.rows;
}

function formatDate(date: Date = new Date()) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

export async function updateProducts(client: Client) {
    const res = await client.query(`
        UPDATE products
        SET title = title || ' ' || sku, updated_at = $1
        RETURNING *`,
         [formatDate()]
    );
    return res.rows;
}