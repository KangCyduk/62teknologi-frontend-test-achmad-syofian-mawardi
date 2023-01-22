# 62teknologi-frontend-test-achmad-syofian-mawardi
## Authors

- [Achmad Syofian M](https://www.linkedin.com/in/achmad-syofian-mawardi-522518176/)

## Things to know before using this project

- file `.env.example` => berisi contoh file `.env` yang akan di create sebelum run debug di local development
- `REACT_APP_API_BASE_URL` di dalam file `.env` => link itu API
- `REACT_APP_API_KEY` di dalam file `.env` => token API
- page yang ditampilkan ada di folder `component`
- routing dinamis by object data, bisa di configure di dalam file `routes/AppRoutes.jsx`
- api call axios yang di customize outputnya, bisa di lihat di file `helpers/helpersApi.jsx`

## How to run in local development

Clone projectnya

```bash
  git clone https://github.com/KangCyduk/62teknologi-frontend-test-achmad-syofian-mawardi.git
```

Pergi ke folder projectnya

```bash
  cd 62teknologi-frontend-test-achmad-syofian-mawardi
```

Install dependencies

```bash
  npm install
```
Create file `.env` refer to `.env.example`

Start debug project dari local

```bash
  npm run start
```

## Explanation

#### library
- axios                         => library helper untuk call API
- bootstarp                     => framework UI
- dotenv                        => helper untuk variable environment
- eslint                        => tools untuk melakukan static analyzes dan untuk customize rule warning/error mana saja yang bisa ditampilkan
- react-responsive-carousel     => untuk menampilkan slider
- react-data-table-component    => untuk menampilkan list data dalam bentuk table
- react-router-dom              => di project ini digunakan untuk helper routing
