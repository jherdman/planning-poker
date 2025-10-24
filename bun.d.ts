declare module "bun" {
	interface Env {
		DATABASE_URL: string;
		COOKIE_SECRET: string;
	}
}
