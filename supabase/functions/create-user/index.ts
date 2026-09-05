// AP2MD CONNECT PRO
// Fonction sécurisée de création des utilisateurs
// Version initiale — préparation de l'authentification

Deno.serve(async (_req) => {
  return new Response(
    JSON.stringify({
      success: true,
      service: "AP2MD CONNECT PRO - Create User",
      status: "ready"
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
});
