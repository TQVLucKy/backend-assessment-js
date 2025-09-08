import { Router } from 'itty-router';
import { AllProduct, deleteProducts, initProductsTable, insertProducts, updateProducts } from "./database";
import { Client } from '@neondatabase/serverless';

export interface Env {
	DATABASE_URL: string;
}


const router = Router();


router.get("/createproducts", async (req, env: Env, ctx: ExecutionContext) => {
	const client = new Client({ connectionString: env.DATABASE_URL });
	await client.connect();
	try {
		await initProductsTable(client);
		ctx.waitUntil(client.end());
		return Response.json({
			success: true,
			message: `Table 'products' created successfully.`
		});
	}
	catch (error: any) {
		return Response.json({
			success: false,
			message: error.message
		}, { status: 500 });
	}
});


router.get("/api/products", async (req, env: Env, ctx: ExecutionContext) => {
	const client = new Client({ connectionString: env.DATABASE_URL });
	await client.connect();
	try {
		await initProductsTable(client);
		const res = await fetch("https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/get");
		const data = await res.json();

		if (!data || !data.products || data.products.length === 0) {
			return Response.json(
				{ success: false, message: "No products found from API" },
				{ status: 404 }
			);
		}

		let total = 0;
		for (const product of data.products) {
			total += await insertProducts(client, product);
		}

		ctx.waitUntil(client.end());
		return Response.json({
			success: true,
			message: `Inserted ${total} products successfully.`
		});
	}
	catch (error: any) {
		return Response.json({
			success: false,
			message: error.message
		}, { status: 500 });
	}
});

router.post("/api/products", async (req, env: Env, ctx: ExecutionContext) => {
	const client = new Client({ connectionString: env.DATABASE_URL });
	await client.connect();

	try {
		const res = await fetch("https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/getProducts");
		const data = await res.json();
		if (!data || !data.products || data.products.length === 0) {
			return Response.json(
				{ success: false, inserted: 0, message: "No products found from API" },
				{ status: 404 }
			);
		}
		let total = 0;
		for (const product of data.products) {
			total += await insertProducts(client, product);
		}
		const insertedProducts: any[] = [];
		const allProduct= await AllProduct(client)
		for (const product of allProduct){
			insertedProducts.push({
					ProductID: product.id,
					Title: product.title,
					Tags: product.tags,
					CreatedAt: product.created_at,
					UpdatedAt: product.updated_at,
					ProductCode: product.sku
				});
		}
		ctx.waitUntil(client.end());
		return Response.json({
			success: true,
			inserted: total,
			message: `Inserted ${total} products successfully.`,
			products: insertedProducts
		});
	}
	catch (error: any) {
		return Response.json({
			success: false,
			message: error.message
		}, { status: 500 });
	}
});


router.delete("/api/products/:product_id", async (req, env: Env,ctx:ExecutionContext) => {
	const client = new Client({ connectionString: env.DATABASE_URL });
	await client.connect();

	try {
		const url = new URL(req.url);
		const product_id = url.pathname.split("/").pop();
		if (!product_id) {
			return Response.json({ success: false, message: "Missing ProductId" }, { status: 404 });
		}
		const deleted = await deleteProducts(client, Number(product_id));
		ctx.waitUntil(client.end());
		if (deleted.length === 0) {
			return Response.json({
				success: false, message: "Product not found"
			}, { status: 404 });
		}
		return Response.json({
			success: true,
			message: `Deleted product ${product_id} successfully.`
		});
	}
	catch (error: any) {
		return Response.json({
			success: false,
			message: error.message
		}, { status: 500 });
	}
});


router.put("/api/products", async (req, env: Env, ctx: ExecutionContext) => {
	const client = new Client({ connectionString: env.DATABASE_URL });
	await client.connect();

	try {
		const updated = await updateProducts(client);
		ctx.waitUntil(client.end());
		if (updated.length === 0) {
			return Response.json({
				success: false, message: "No products found to update"
			}, { status: 404 });
		}
		return Response.json({ 
			success: true,
			message: `Updated ${updated.length} products successfully.`,
			products: updated });
	}
	catch (error: any) {
		return Response.json({
			success: false,
			message: error.message
		}, { status: 500 });
	}
});

export default {
	async fetch(req: Request, env: Env, ctx: ExecutionContext) {
		const res= await router.fetch(req, env, ctx);
		return res || new Response("Not Found", {status: 404});
	},
};
