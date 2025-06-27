function StockList({ stockMovements }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
      {" "}
      <table className="w-full text-sm text-left text-gray-700">
        {" "}
        <thead className="text-xs text-gray-600 uppercase bg-gray-50">
          {" "}
          <tr>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Producto
            </th>{" "}
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Tipo
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Cantidad
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Fecha
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(stockMovements) && stockMovements.length > 0 ? (
            stockMovements.map((movement) => (
              <tr key={movement.id} className="border-b hover:bg-gray-50">
                {" "}
                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                  {movement.productoName}
                </td>
                <td className="px-4 py-3 whitespace-nowrap capitalize">
                  {movement.type}
                </td>{" "}
                <td className="px-4 py-3 whitespace-nowrap">
                  {movement.cantidad}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date(movement.fecha).toLocaleDateString("es-ES")}
                </td>{" "}
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-6 text-center text-gray-500" colSpan="4">
                No hay movimientos registrados
              </td>{" "}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StockList;
