# Date Picker

Versions used :

    node : 22.12.0
    yarn : 1.22.21
    tailwind : 4.1.11

Installation :

```shell
npm i tailwind-date-picker
```

Notes :
The component already contains a minimum date to 01/01/1950 and a maximum date to 12/31/2025
The props containerClassName only allow you to customized your component container

Classic utilisation :

```js
import { DatePicker } from "tailwind-date-picker";
import "tailwind-date-picker/tailwind-date-picker.css";

<main>
  <h1>Random title</h1>
  <DatePicker />
</main>;
```

Personnalised utilisation :

```js
import { DatePicker } from "tailwind-date-picker";
import "tailwind-date-picker/tailwind-date-picker.css";

<main>
  <h1>An other random title</h1>
  <DatePicker minimumDate="02/25/1994" maximumDate="12/17/2025" containerClassName="p-8" />
</main>;
```
