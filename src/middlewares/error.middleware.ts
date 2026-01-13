import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import z, { ZodError } from "zod";

export const errorHandler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: "Erro de validação (zod)",
			errors: z.treeifyError ? z.treeifyError(error) : error.format?.() ?? (error as ZodError).issues,
		});
	}

	if ((error as any).validation) {
		return reply.status(400).send({
			message: "Erro de validação (schema)",
			errors: (error as any).validation,
		});
	}

	const anyErr = error as any;
	if (anyErr.code === "P2002") {
		return reply.status(409).send({
			message: "Conflito de banco de dados (registro já existe)",
			target: anyErr.meta?.target ?? null,
		});
	}

	const status = (error as any).statusCode ?? 500;
	return reply.status(status).send({
		message: (error as any).message ?? "Erro interno do servidor",
	});
};
