import { FastifyInstance } from "fastify";
import { listProducts } from "../controllers/products.controllers";

export default async function productRoutes(fastify: FastifyInstance) {
	fastify.get("/", listProducts);
}
