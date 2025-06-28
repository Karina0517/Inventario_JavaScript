## 🏪 Sistema de Inventario Supermercados la K

Este es un sistema web interactivo para gestionar productos, usando estructuras de datos  de JavaScript como Objetos, Sets y Maps. 

## 🚀 Instrucciones de uso

1. Abrir el sistema

Solo debes abrir el archivo index.html en cualquier navegador.

2. Agregar un nuevo producto

Escribe el nombre del producto.

Ingresa el costo en formato numérico (ej: 19.99).

Selecciona el tipo desde la lista desplegable.

Haz clic en "Guardar" para agregar el producto al sistema.

⚠️ Si dejas campos vacíos o el valor es inválido, el sistema no añadirá el producto.

3. Buscar y filtrar productos

Usa el campo de búsqueda para encontrar productos por nombre.

Usa el selector de tipo para mostrar solo productos de una categoría específica.

📊 Visualización de datos

El sistema está dividido en tres secciones dinámicas:

## 📋 Lista de Elementos

Muestra todos los productos añadidos.

Utiliza un objeto (itemsData) para organizar los productos por ID.

🔗 Elementos Únicos

Muestra nombres únicos sin repetir.

Se implementa con un Set (uniqueItems).

🗂️ Tipos de Elementos

Agrupa productos según su categoría.

Usa un Map (typesMap) para asociar tipos con sus productos.

