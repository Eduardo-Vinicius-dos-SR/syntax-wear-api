import { FastifyReply, FastifyRequest } from "fastify";
import { getProductById, getProducts } from "../services/products.service";
import { productFiltersSchema } from "../utils/validator";
import z from "zod";

type Query = z.infer<typeof productFiltersSchema>;

export const listProducts = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const parsed = await productFiltersSchema.parseAsync(request.query as any);
		const result = await getProducts(parsed as any);
		return reply.send(result);
	} catch (e: any) {
		return reply.status(400).send({ message: "Invalid query", errors: e.errors ?? e.message });
	}
};

export const getProduct = async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
	const product = await getProductById(request.params.id);
	reply.status(200).send(product);
};
