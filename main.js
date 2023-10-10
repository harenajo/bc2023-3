const fs = require('fs');

// Функція для аналізу JSON-даних та знаходження активу з найменшим значенням
function Minvalue(data) {
    let minValue = Infinity;
    let minAsset = null;

    for (const active of data) {
        if (active.value < minValue) {
            minValue = active.value;
            minAsset = active.txt;
        }
    }

    return `${minAsset}:${minValue}`;
}

// Читаємо дані з файлу data.json
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err === null) {
        try {
            const jsonData = JSON.parse(data);
            const result = Minvalue(jsonData);

            // Записуємо результат в файл output.txt
            fs.writeFile('output.txt', result, 'utf8', (err) => {
                if (err === null) {
                    console.log('Результат записано в output.txt');
                } else {
                    console.error('Помилка запису в файл output.txt:', err);
                }

            });
        } catch (parseError) {
            console.error('Немає данних', parseError);
        }
    } else {
        console.error('Помилка читання файлу data.json:', err);
    }
});
