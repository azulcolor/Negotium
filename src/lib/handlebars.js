const { format, register } = require('timeago.js') //Puede utilizar `import` para Javascript code.

register('es_ES', (number, index, total_sec) => [
    ['justo ahora', 'ahora mismo'],
    ['hace %s segundos', 'en %s segundos'],
    ['hace 1 minuto', '1 minuto'],
    ['hace %s minutos', '%s minutos'],
    ['hace 1 hora', '1 hora'],
    ['hace %s horas', '%s horas'],
    ['hace 1 dia', '1 dia'],
    ['hace %s dias', '%s dias'],
    ['hace 1 semana', '1 semana'],
    ['hace %s semanas', '%s semanas'],
    ['1 mes', 'en 1 mes'],
    ['hace %s meses', '%s meses'],
    ['hace 1 año', '1 año'],
    ['hace %s años', '%s años']
][index]);

const timeago = timestamp => format(timestamp, 'es_ES');

const helpers = {};

helpers.moment = (timestamp) => {
    
    let month = timestamp.getMonth() + 1;
    let year = timestamp.getFullYear();
    let date = timestamp.getDate();
    let result = `${date}/${month}/${year}`;
    return result;
};

helpers.timeago = (timestamp) => {
    
    return timeago(timestamp);

};

module.exports = helpers;