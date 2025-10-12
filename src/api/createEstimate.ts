/**
 * Creates an estimate. Currently just echos back the estimation.
 *
 * @example POST /api/createEstimate
 * @body { estimation: number }
 * @response { estimation: number }
 */
export default async function createEstimateHandler(req: Request) {
	const { estimation } = await req.json();

	return Response.json({ estimation });
}
