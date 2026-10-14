
const args = process.argv.slice(2);
const [method, route, ...params] = args;

const API_URL = "https://fakestoreapi.com";

async function gestionarProyecto() {
  if (!method || !route) {
    console.log("❌ Comando incompleto. Usa el formato correcto.");
    return;
  }

  const metodoUpper = method.toUpperCase();

  try {
    switch (metodoUpper) {
      case "GET": {
        const response = await fetch(`${API_URL}/${route}`);
        const data = await response.json();
        console.log("📦 Datos obtenidos:", data);
        break;
      }

      case "POST": {
        if (route !== "products" || params.length < 3) {
          console.log("❌ Formato incorrecto para POST.");
          console.log("Ejemplo: npm run start POST products T-Shirt-Rex 300 remeras");
          return;
        }

        
        const [title, priceStr, category] = params;
        const price = Number(priceStr);

        const nuevoProducto = {
          title,
          price,
          category,
          description: "Creado desde la CLI",
          image: "https://fakestoreapi.com/img/placeholder.jpg"
        };

        const response = await fetch(`${API_URL}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoProducto)
        });

        const data = await response.json();
        console.log("✅ ¡Producto creado con éxito!");
        console.log({ id: data.id, ...nuevoProducto });
        break;
      }

      case "DELETE": {
        const response = await fetch(`${API_URL}/${route}`, {
          method: "DELETE"
        });
        const data = await response.json();
        console.log("🗑️ Producto eliminado correctamente:", data);
        break;
      }

      default:
        console.log(`❌ Método HTTP no soportado: ${metodoUpper}`);
    }
  } catch (error) {
    console.log("❌ Error en la petición:", error.message);
  }
}

gestionarProyecto();