const fs = require('fs');

// ������� ��� ������ JSON-����� �� ����������� ������ � ��������� ���������
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

// ������ ��� � ����� data.json
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err === null) {
        try {
            const jsonData = JSON.parse(data);
            const result = Minvalue(jsonData);

            // �������� ��������� � ���� output.txt
            fs.writeFile('output.txt', result, 'utf8', (err) => {
                if (err === null) {
                    console.log('��������� �������� � output.txt');
                } else {
                    console.error('������� ������ � ���� output.txt:', err);
                }

            });
        } catch (parseError) {
            console.error('���� ������', parseError);
        }
    } else {
        console.error('������� ������� ����� data.json:', err);
    }
});
