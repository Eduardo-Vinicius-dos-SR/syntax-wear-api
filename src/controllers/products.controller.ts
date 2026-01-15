import { FastifyReply, FastifyRequest } from "fastify";
import { CreateProduct, ProductFilters } from "../types";
import { getProducts, getProductById, createProduct } from "../services/products.service";
import { createProductSchema, productFiltersSchema } from "../utils/validators";
import slugify from "slugify";

export const listProducts = async (request: FastifyRequest<{ Querystring: ProductFilters }>, reply: FastifyReply) => {
	const filters = productFiltersSchema.parse(request.query);
	const result = await getProducts(filters as ProductFilters);
	reply.status(200).send(result);
};

export const getProduct = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
	const id = Number(request.params.id);
	if (Number.isNaN(id)) {
		return reply.status(400).send({ message: "ID inválido" });
	}
	const product = await getProductById(id);
	reply.status(200).send(product);
};

export const createNewProduct = async (request: FastifyRequest<{ Body: CreateProduct }>, reply: FastifyReply) => {
	const body = request.body;

	body.slug = slugify(body.name, {
		lower: true,
		strict: true,
		locale: "pt",
	});

	const validate = createProductSchema.parse(body);
	await createProduct(validate);

	reply.status(201).send({ message: "Produto criado com sucesso" });
};
