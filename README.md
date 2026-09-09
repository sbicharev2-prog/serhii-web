# Serhii Web — portfolio

Gotowy statyczny serwis portfolio do wrzucenia na GitHub Pages, Netlify albo zwykły hosting.

## Przed finalną publikacją

Otwórz `site-config.js` i ustaw:

```js
email: "twoj@email.pl",
domain: "https://serhiiweb.pl",
```

Telegram jest już ustawiony na `@webbyserhii`.

Opcjonalnie możesz dodać WhatsApp:

```js
whatsappNumber: "48123123123"
```

Numer bez `+`, spacji i myślników. Jeśli zostawisz pusty, WhatsApp będzie ukryty.

Po podłączeniu domeny zamień `https://serhiiweb.pl` również w `robots.txt` oraz `sitemap.xml`.

## Formularz

Formularz wysyła wiadomości bezpośrednio na `kontakt@serhiiweb.pl` przez Google Apps Script.

Endpoint:
`https://script.google.com/macros/s/AKfycbw6JJiH2I8oMCGHC-aWy68klZFhloxPizmpKiTP2MV4Er85ncbFJaMDGXgwyARHz6vBmg/exec`

Ważne: wdrożenie Apps Script musi mieć dostęp ustawiony na **Anyone / Każdy**. Po zmianie kodu Apps Script użyj **Manage deployments → Edit → New version → Deploy**, żeby opublikować aktualną wersję.

Adres endpointu można zmienić w `site-config.js` w polu `formEndpoint`.

## Portfolio

- U Kazików — https://ukazikow.pl
- Kaya Flowers — https://sbicharev2-prog.github.io/kaya-flowers/
- Hamadiel Barbershop — https://hamadiel-barbershop-demo.netlify.app

## Cennik w projekcie

- Strona wizytówka — od 1 790 zł
- Strona firmowa — od 2 790 zł
- Sklep internetowy — od 4 490 zł

## Formularz — UX
Po wysłaniu przycisk jest chwilowo blokowany, pokazuje status wysyłania, a klient dostaje widoczne potwierdzenie sukcesu. Dzięki temu trudniej przypadkowo wysłać tę samą wiadomość kilka razy.
