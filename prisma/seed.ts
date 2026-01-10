import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } } as any);

const products = [
	{
		name: "Camiseta Syntax Básica",
		slug: "camiseta-syntax-basica",
		description: "Camiseta 100% algodão, corte reto, várias cores.",
		price: "49.9",
		images: ["/images/prod1-1.jpg"],
		sizes: ["P", "M", "G"],
		stock: 150,
		active: true,
	},
	{
		name: "Moletom Syntax Logo",
		slug: "moletom-syntax-logo",
		description: "Moletom com capuz e logo bordado.",
		price: "149.9",
		images: ["/images/prod2-1.jpg"],
		sizes: ["M", "G", "GG"],
		stock: 80,
		active: true,
	},
	{
		name: "Calça Jogger Syntax",
		slug: "calca-jogger-syntax",
		description: "Calça jogger com elástico no tornozelo.",
		price: "119.9",
		images: ["/images/prod3-1.jpg"],
		sizes: ["P", "M", "G"],
		stock: 60,
		active: true,
	},
	{
		name: "Boné Syntax",
		slug: "bone-syntax",
		description: "Boné ajustável com etiqueta frontal.",
		price: "39.9",
		images: ["/images/prod4-1.jpg"],
		sizes: null,
		stock: 200,
		active: true,
	},
	{
		name: "Camiseta Oversized Syntax",
		slug: "camiseta-oversized-syntax",
		description: "Oversized com estampa frontal.",
		price: "59.9",
		images: ["/images/prod5-1.jpg"],
		sizes: ["M", "G", "GG"],
		stock: 90,
		active: true,
	},
	{
		name: "Regata Syntax",
		slug: "regata-syntax",
		description: "Regata leve para uso diário.",
		price: "29.9",
		images: ["/images/prod6-1.jpg"],
		sizes: ["P", "M", "G"],
		stock: 120,
		active: true,
	},
	{
		name: "Mala Duffel Syntax",
		slug: "mala-duffel-syntax",
		description: "Mala de viagem resistente com compartimentos.",
		price: "249.9",
		images: ["/images/prod7-1.jpg"],
		sizes: null,
		stock: 25,
		active: true,
	},
	{
		name: "Casaco Parka Syntax",
		slug: "casaco-parka-syntax",
		description: "Parka com isolamento térmico.",
		price: "299.9",
		images: ["/images/prod8-1.jpg"],
		sizes: ["M", "G"],
		stock: 40,
		active: true,
	},
	{
		name: "Meia Syntax Pack 3",
		slug: "meia-syntax-pack-3",
		description: "Pack com 3 pares de meias confortáveis.",
		price: "19.9",
		images: ["/images/prod9-1.jpg"],
		sizes: ["Único"],
		stock: 300,
		active: true,
	},
	{
		name: "Cinto Syntax",
		slug: "cinto-syntax",
		description: "Cinto em material sintético com fivela metálica.",
		price: "69.9",
		images: ["/images/prod10-1.jpg"],
		sizes: ["M", "G"],
		stock: 75,
		active: true,
	},
];

async function main() {
	console.log("Iniciando seed de produtos...");

	// Inserir produtos um a um para obter logs claros (evita problemas com createMany + Decimal)
	for (const p of products) {
		try {
			await prisma.product.create({ data: p as any });
			console.log(`Inserido: ${p.slug}`);
		} catch (e: any) {
			// ignorar duplicatas e continuar
			console.warn(`Falha ao inserir ${p.slug}: ${e.message}`);
		}
	}

	console.log("Seed finalizado.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
