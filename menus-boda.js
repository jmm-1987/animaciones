(function () {
 const menus = [
  {id:'jardin', name:'Jardín', cents:8500, dishes:['Burrata con tomates de temporada', 'Merluza al horno con verduras', 'Tarta de limón y merengue']},
  {id:'brindis', name:'Brindis', cents:10500, dishes:['Vieiras con crema de coliflor', 'Solomillo con patatas gratinadas', 'Tarta de chocolate y frambuesas']},
  {id:'gran-fiesta', name:'Gran Fiesta', cents:12500, dishes:['Bogavante con cítricos', 'Carrillera ibérica al vino tinto', 'Pavlova con frutos rojos']}
 ];
 const formatter = new Intl.NumberFormat('es-ES', {style:'currency', currency:'EUR'});
 const money = cents => formatter.format(cents / 100);
 const catalog = {menus, money, initialGuests:100};
 if (typeof module === 'object') module.exports = catalog;
 else window.menusBoda = catalog;
})();
