# test-frontend-rgb
## Authors

- [Achmad Syofian M](https://www.linkedin.com/in/achmad-syofian-mawardi-522518176/)

## Things to know before using this project

- file `.env.example` => berisi contoh file `.env` yang akan di create sebelum run debug di local development
- `REACT_APP_API_BASE_URL` di dalam file `.env` => link itu API
- page yang ditampilkan ada di folder `views`
- component global ada di folder `components`
- assets seperti css dan image ada di folder `assets`
- variable - variable yang bisa digunakan global ada di file `helper/globalHelper.js`
- routing dinamis by object data, bisa di configure di dalam file `helper/route.js`
- shared master user untuk halaman user ada di dalam folder `views/user/shared`
- language switching didalam file `helper/lang.js`
- api call axios yang di customize outputnya, bisa di lihat di file `helper/apiHelper.js`
- jika basename homepagenya ingin diubah. maka bisa diubah bagian `homepage` di file `package.json`

## How to run in local development

Clone projectnya

```bash
  git clone https://github.com/KangCyduk/62teknologi-frontend-test-achmad-syofian-mawardi.git
```

Pergi ke folder projectnya

```bash
  cd test-frontend-62teknologi
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

## Deployment

Untuk deploy ke web server berikut langkah-langkahnya

Pastikan sudah melakukan step `How to run in local development` atau minimal create file `.env` dan `npm install` 

Run command di bawah

```bash
  npm run build
```

Copy semua file di folder build

Buat folder `test-frontend-62teknologi` di web server (disesuaikan dengan `homepage` yang ada di file `package.json`)

Paste file yang sebelumnya di copy ke folder `test-frontend-62teknologi`

buka link [localhost](http://localhost/test-frontend-62teknologi/) di browser

## Explanation

#### library
- axios                     => library helper untuk call API
- bootstarp                 => framework UI
- dotenv                    => helper untuk variable environment
- eslint                    => tools untuk melakukan static analyzes dan untuk customize rule warning/error mana saja yang bisa ditampilkan
- lodash                    => di project ini saya gunakan untuk sorting array
- react-simple-star-rating  => library untuk menampilkan star rating
- sass                      => untuk styling menggunakan scss
- react-helmet-async        => untuk customize async header html
- react-router-dom          => di project ini digunakan untuk helper routing