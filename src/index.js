module.exports = function zeros(expression) {
  // your solution
  let splittedArray = expression.split('*');

    let output = [];
    let output1 = 1;
    let output2 = 1;
    let output3 = 1;
    let zerosNumber = 0;

    splittedArray.forEach(function (element) {

        if (element.indexOf('!!') !== -1) {   // если элемент содержит '!!'

            let number = element.substring(0, element.length - 2); // оставляем только само число и удаляем из него '!'

            if (number % 2 === 0) {  // четное число. Если верно, должны перемножить только четные числа (2,4,6,8 ......)

                let array = [];
                for (let i = 2; i <= number; i = i + 2) {  // выбираем только четные числа
                    array.push(i.toString());
                }

                let res =  array.reduce(function (a, b) {   // перемножаем их между собой

                    return multiply(a, b);
                });

                output2 = multiply(output2, res);  // умножаем то что было раньше в переменонй  output2 и то что получили в res

            } else {    // нечетное число

                let array = [];
                for (let i = 1; i <= number; i = i + 2) {  // оставляем только нечетные числа (1,3,5,7......)
                    array.push(i.toString());
                }

                let res = array.reduce(function (a, b) {

                    return multiply(a, b);
                });

                output3 = multiply(output3, res);

            }

        } else {   // если элемент НЕ содержит '!!'  => просто считаем факториал числа не важно четное или нет число
            let number = element.substring(0, element.length - 1);  // оставляем только само число и удаляем из него '!'
            let array = [];
            for (let i = 1; i <= number; i++) {
                array.push(i.toString());    // пишем в массив все числа
            }

            let res = array.reduce(function (a, b) {   // перемножаем числа между собой

                return multiply(a, b);
            });

            output1 = multiply(output1, res);   // умножаем то что было раньше в переменонй  output1 и то что получили в res
        }
    });

    // добавляем в массив все, что выше считалось все три случая чтобы потом снова перемножить
    output.push(output1);
    output.push(output2);
    output.push(output3);

    let str =  output.reduce(function (a, b) {  // перемножаем уже результаты всех трех случаев что выше было посчитано
        return multiply(a, b);
    });


    for (let i=str.split('').length-1; i>=0; i--){   // идем с конца массива и увеличиваем счетчик пока элемент равен 0. Иначе выход из цикла
        if(str.split('')[i]==='0'){
            zerosNumber++;
        } else break
    }

    return zerosNumber;   // возвращаем количество нулей

};


function multiply(first, second) {

    let result = [];

    if (parseInt(first) === 0 || parseInt(second) === 0) {
        return '0';
    }

    if (parseInt(first) === 1) {
        return second.toString();
    }

    if (parseInt(second) === 1) {
        return first.toString();
    }

    first = first.split('').reverse();
    second = second.split('').reverse();

    for (let i = 0; first[i] >= 0; i++) {
        for (let j = 0; second[j] >= 0; j++) {
            if (!result[i + j]) {   // if undefined or null (not exist)
                result[i + j] = 0;
            }

            result[i + j] = result[i + j] + first[i] * second[j];
        }
    }

    for (let i = 0; result[i] >= 0; i++) {
        if (result[i] >= 10) {
            if (!result[i + 1]) {   // if undefined or null (not exist)
                result[i + 1] = 0;
            }
            result[i + 1] = result[i + 1] + parseInt(result[i] / 10);
            result[i] = result[i] % 10;
        }
    }

    return result.reverse().join('');
}
