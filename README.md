<p align="center">
  <img alt="Rocketseat Education" src="https://avatars.githubusercontent.com/u/69590972?s=200&v=4" width="100px" />
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Rocketseat&message=Education&color=8257e5&labelColor=202024" alt="Rocketseat Project" />
  <a href="LICENSE"><img  src="https://img.shields.io/static/v1?label=License&message=MIT&color=8257e5&labelColor=202024" alt="License"></a>
</p>


## 💻 Projeto

igniteshoesapp

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com 💜 by Rocketseat
</p>


---
Passos executados

1. Instalações

**[Uso de variáveis de Ambiente - react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv)**
```bash
yarn add --dev react-native-dotenv
```
Aqui ainda foi adicionado o seguinte bloco no arquivo `babel.config.js`
```javascript
plugins: [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "safe": false,
        "allowUndefined": true
      }]
    ],
``` 

 
***Para typescript***
Crie um diretório `./src/@types` e um arquivo `env.d.tsx` e adicione as seguintes linhas:
```javasctipt
declare module '@env' {
  export const API_BASE: string;
}
```

E em `tsconfig.json`
```javascript
"typeRoots": ["./src/@types"]
```

---
**[Controle dos Push Notifications - OneSignal](https://documentation.onesignal.com/docs/react-native-expo-sdk-setup)**
```bash
npx expo install onesignal-expo-plugin
yarn add react-native-onesignal@4.5.1
```
Foi usada a versão 4.5.1 expecificamente para não pegar uma versão beta mais nova.
Ainda é preciso adicionar a seguinte configuração no arquivo `app.json`
```json
{
  "plugins": [
    [
      "onesignal-expo-plugin",
      {
        "mode": "development",
      }
    ]
  ]
}
```
E a ativação do OneSignal do projeto. Arquivo `App.tsx`
```javascript
import OneSignal from 'react-native-onesignal';
import Constants from "expo-constants";
...
OneSignal.setAppId("YOUR-ONESIGNAL-APP-ID");
```

***Development Duilds***
As compilações de desenvolvimento podem ser criadas com o EAS Build ou localmente em seu computador. Você precisará do Xcode (iOS) ou do Android Studio (Android) para instalar o seu App diretamente no emulador ou dispositivo físico para continuar seu aplicativo.  
Para iniciar uma compilação de desenvolvimento, você precisará instalar o `expo-dev-client`

Quando você precisar personalizar seu projeto além das APIS padrão
fornecidas no Expo Go, poderá criar um cliente de desenvolvimento
personalizado para seu aplicativo, instalá-lo no dispositivo e continuar desenvolvendo.

Corrigir o seguinte erro:
<pre style="color: red; font-weight: 600">`AssertionError [ERR_ASSERTION]: Missing 'ios.bundleIdentifier' in app config.`</pre>
No arquivo `app.json` adicionar a linha com a seta.

```json
"ios": {
      "supportsTablet": true,
▶️      "bundleIdentifier": "com.axesoft.igniteshoesapp"
    },
```


Voltando aos passos do OneSignal(https://documentation.onesignal.com/docs/react-native-expo-sdk-setup).
```bash
expo prebuild
```

Reforçar a importância de termos nosso ambiente nativo configurado na máquina para evitar que nossa aplicação tenha problemas no momento do build.

Link da documentação: https://react-native.rocketseat.dev/



[expo-dev-client](https://docs.expo.dev/develop/development-builds/installation/)
```bash
npm install -g eas-cli
npx expo install expo-dev-client
```
---


[Configurações para o Deep Linking - React Navigation](https://reactnavigation.org/docs/deep-linking/)

Adicionar a seguinte linha no arquivo `app.json`
```
"scheme": "igniteshoesapp",
```

Confirmado a configuração
```bash
npx expo prebuild

npx uri-scheme list
```
Saída:
```bash
 Android: Schemes for config: ./android\app\src\main\AndroidManifest.xml
 com.axesoft.igniteshoesapp://
 igniteshoesapp://
 exp+igniteshoesapp://
```

Recria a aplicação no emulador
```bash
npx expo run:android
```

Em abiente de desenvolvimento enviamos o deep link com o IP do servidor onde está rodando o emulador.
```
npx uri-scheme open igniteshoesapp://192.168.68.108:8081 --android
```
Usamos um dos schemas listados no comando `npx uri-scheme list`.

Instalação do expo-linking
```bash
npx expo install expo-linking
```
