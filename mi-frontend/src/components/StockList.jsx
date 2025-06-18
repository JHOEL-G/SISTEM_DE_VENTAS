function StockList({ stockMovements }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-2">Producto</th>
            <th className="text-left p-2">Tipo</th>
            <th className="text-left p-2">Cantidad</th>
            <th className="text-left p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(stockMovements) && stockMovements.length > 0 ? (stockMovements.map(movement => (
            <tr key={movement.id}>
              <td className="p-2">{movement.productoName}</td>
              <td className="p-2">{movement.type}</td>
              <td className="p-2">{movement.cantidad}</td>
              <td className="p-2">{new Date(movement.fecha).toLocaleDateString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="p-2 text-center" colSpan="4">No hay movimientos registrados</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default StockList;