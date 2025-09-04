# Date Picker

Versions used :

```shell
node : 22.12.0
yarn : 1.22.21
tailwind : 4.1.11
```

Installation :

```shell
npm i tailwind-date-picker ou yarn add tailwind-date-picker
```

Classic use :

```js
import { DatePicker } from "tailwind-date-picker";
import "tailwind-date-picker/tailwind-date-picker.css";

<main>
  <h1>Random title</h1>
  <DatePicker />
</main>;
```

Personnalised use :

```js
import { DatePicker } from "tailwind-date-picker";
import "tailwind-date-picker/tailwind-date-picker.css";

<main>
  <h1>An other random title</h1>
  <DatePicker
    minimumDate="02/25/1994"
    maximumDate="12/17/2025"
    containerClassName="p-8"
    calendarClassName="top-8"
    id="birthdate"
  />
</main>;
```

Notes :

- The component already contains a minimum date to 01/01/1950 and a maximum date to 12/31/2025
- The props containerClassName allows you to customized your component container and the props calendarClassName your calendar
