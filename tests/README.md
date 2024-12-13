
# Запуск
1. Убедитесь, что у вас установлен Node.js и npm (или yarn).
2. Клонируйте репозиторий: git clone https://github.com/OlyaBaeva/table_js
3. Перейдите в директорию проекта: cd tests
4. Установите зависимости: npm install (или yarn install)
5. Запустите приложение: npm run dev (или yarn dev)

## Функциональность
На главной странице вы увидете меню из 5 кнопок. 
• 1 Тест - Тест на скорость печати. Необходимо ввести в текстовое поле текст, соответсвующий написанному под текстовым полем. Индикация зеленым букв показывает правильность введенного символа. Красный цвет и предупреждение символизируют ошибку. Пока Вы не исправите ошибку, подсчёт скорости печати не будет произведен.  
• 2 Тест - Тест коммуникативной установки: Психологический тест. Ответьте на все вопросы и нажмите далее. Вам будет показан результат - набранное количество баллов за каждую из групп:
1 Группа. Завуалированная жестокость в отношениях к людям, в суждениях о них.
2 Группа. Открытая жестокость в отношениях к людям.
3 Группа. Обоснованный негативизм в суждениях о людях.
4 Группа. Брюзжание
5 Группа. Негативный личный опыт общения с окружающими.
• 3 Тест - Тест на нахождение неправильной последовательности:  Всего 8 раундов. На каждый раунд отводится 30 секунд. Вам будут показаны 5 последовательностей, в одной из которых допущена ошибка. На каждый раунд по 1 попытке. В конце Вам будет показано общее количество правильных ответов.
• 4 Тест - Тест на избирательность внимания:  Вам будет показана таблица 10*10. Над таблицей выведено 10 чисел, которые необходимо найти в данной таблице. При клике в таблице на число, присутствующее среди поискового массива, яцейка будет выделена зеленым. Игра продолжается 5 минут, после этого Вам будет показан результат и его интерпретация. 
* Не рассматривайте результаты, как окончательный диагноз! 
• 5 Тест - Буквенный охват:  Вам будет на 3 секунды показана строка с буквами. Необходимо запомнить последовательность букв и повторить её. С каждым правильным вводом длина строки будет увеличиваться на 1 букву. При неправильном ответе, Вам будет предложено начать игру сначала. Так же будет показан Ваш прошлый результат - размер самой длинной введенной верно последовательности.

## Технологии

• Vue.js
• Vite (для сборки)