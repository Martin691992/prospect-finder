export function callInseeAPI(){

	async function callApi(code_naf, departements, typeEnt,nbSalaries, page, nbParPages) {
		const response = await fetch('/api/get_naf_unitaire', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				code_naf: code_naf ?? "",
				departements: departements ?? "",
				typeEnt: typeEnt ?? "",
				nbSalaries : nbSalaries ?? "",
				page: page ?? "",
				nbParPages: nbParPages ?? ""
			})
		});
		const data = await response.json();
		return {
			data
		}
	}
    return {
        callApi
    }
}