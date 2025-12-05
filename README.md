# Colorímetro de Baixo Custo

> Status: Em Andamento ⚠️ <br>
> Versão: 0.0.1

---

## 📝 Índice

* [Sobre o Projeto](#-sobre-o-projeto)
* [🎯 Próximos Passos](#-próximos-passos)
* [🛠️ Tecnologias e Componentes](#️-tecnologias-e-componentes)
* [🚀 Começando](#-começando)
  * [Pré-requisitos](#pré-requisitos)
  * [Instalação](#instalação)
* [👥 Autores e Orientadores](#-autores-e-orientadores)
* [📧 Contato](#-contato)

---

## 📖 Sobre o Projeto

Este trabalho propõe a construção de um colorímetro LED-TCS de baixo custo para experimentos de espectrofotometria de absorção com fins pedagógicos, voltado a atividades simplificadas de aprendizagem baseadas em contexto.

O sistema será integrado a um aplicativo mobile, responsável por processar os dados obtidos e implementar ações a partir deles, como medir concentrações e averiguar possibilidades de reações químicas entre os elementos analisados.

Espera-se, como resultado, obter um equipamento de menor custo e, portanto, mais acessível ao público geral, além de facilitar a compreensão dos conceitos envolvidos na espectrofotometria e promover um melhor ensino, de acordo com os Objetivos de Desenvolvimento Sustentável elaborados pela Organização das Nações Unidas.

---

## 🎯 Próximos Passos

- [ ] Elaboração da curva de calibração.
- [ ] Realização dos testes de calibração.

---

## 🛠️ Tecnologias e Componentes

A produção do projeto envolverá as seguintes ferramentas, tecnologias e componentes:

* **Hardware:**
    * Arduino Uno
    * Sensor de cor TCS230
    * LED branco 5 mm
* **Software (Aplicativo Mobile):**
    * React Native
    * JavaScript
    * `react-native-dotenv` para variáveis de ambiente
    * Visual Studio Code (Ambiente de Desenvolvimento)
* **Serviços e Ferramentas:**
    * **Google Firebase** (Authentication e Firestore)
    * **EAS Build** (Expo Application Services)
    * **[Boxes.py](https://boxes.hackerspace-bamberg.de/boxes.py)** para elaboração da caixa (onde estará localizado o circuito)

---

## 🚀 Começando

Instruções sobre como configurar e executar o projeto em um ambiente local.

### Pré-requisitos

* **Para o App Mobile:**
    * Node.js e yarn
    * Expo CLI
    * Android Studio (para emulação) ou um dispositivo Android
    * Conta no [Google Firebase](https://firebase.google.com/) para obter as chaves de configuração
    * [EAS CLI](https://expo.dev/eas) instalado globalmente e logado na sua conta:

        ```sh
        yarn install -g eas-cli
        eas login
        ```

* **Para o Hardware:**
    * Arduino IDE

### Instalação

Um guia passo a passo para configurar o ambiente.

1. **Hardware:**
    * DESCRIÇÃO DO CIRCUITO (INCOMPLETO)

2. **Software (App):**
    * Clone o repositório:

        ```sh
        git clone https://gitlab.com/coegi1/colorimetro-de-baixo-custo.git
        ```

    * Navegue até a pasta do aplicativo:

        ```sh
        cd Colorimetria
        ```

    * Inicialize e configure o EAS no projeto:

        ```sh
        eas project:init
        ```

    * **Configure o Firebase:**
        * Abra o [Console do Firebase](https://console.firebase.google.com/) e crie um projeto.
        * Dentro do projeto Firebase, crie um novo app Android.
        * Siga todos os passos indicados no site para criação do app.
        * Baixe o arquivo `google-services.json` do projeto no console do Firebase.
        * Coloque este arquivo na pasta `colorimetro-de-baixo-custo/Colorimetria/` do projeto React Native.
        * **Crie o arquivo `.env`:**
            Este projeto utiliza um arquivo `.env` para carregar as credenciais do Firebase de forma segura. Copie o arquivo de exemplo:

            ```sh
            cp .env.example .env
            ```

            **IMPORTANTE:** O arquivo `.env` nunca deve ser enviado para o repositório. Certifique-se de que ele está listado no seu arquivo `.gitignore`.

        * **Preencha as chaves do Firebase:**
            Abra o arquivo `.env` recém-criado. Você precisará preenchê-lo com as informações do seu projeto Firebase.
            
            1. Vá para o seu projeto no [Console do Firebase](https://console.firebase.google.com/).
            2. Clique no ícone de engrenagem (Configurações do projeto).
            3. Na aba "Geral", vá para "Seus apps".
            4. Escolha "Configuração" como "SDK" para ver as chaves.
            5. Preencha as seguintes variáveis no seu `.env` com os valores correspondentes:

                ```env
                EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN="seu-projeto.firebaseapp.com"
                EXPO_PUBLIC_FIREBASE_PROJECT_ID="seu-projeto"
                EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET="seu-projeto.firebasestorage.app"
                EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
                EXPO_PUBLIC_FIREBASE_APP_ID="1:1234567890:android:abcdef123456"
                EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID="A-12345BCDEF"
                EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB="seu-id-web.apps.googleusercontent.com"
                EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID="seu-id-android.apps.googleusercontent.com"
                ```

        * **Obtenha a chave de API (API_KEY) do Google Cloud**
            A `API_KEY` é obtida no console do Google Cloud.

            1. **Acesse o [Google Cloud Console](https://console.cloud.google.com/apis/credentials)** e selecione o projeto Firebase correspondente.
            2. No menu, navegue para **APIs e Serviços > Credenciais**.
            3. Encontre a chave com o nome **"Android key (auto created by Firebase)"**.
            4. Clique no ícone de cópia ao lado da chave para copiá-la.
            5. Cole a chave no seu arquivo `.env`:

                ```env
                EXPO_PUBLIC_FIREBASE_API_KEY="seu-api-key"
                ```

        * **Obtenha a chave SHA-1 com EAS Credentials:**

            * Execute o seguinte comando na raíz do projeto:

                ```sh
                eas credentials
                ```

            * Siga as instruções: selecione **Android**, e depois a credencial de build que você utiliza.
            * O CLI irá exibir os detalhes da sua credencial, incluindo o **"SHA-1 Fingerprint"**. Copie este valor.

            * Adicione a chave SHA-1 no Firebase:
                1. Vá para o seu projeto no [Console do Firebase](https://console.firebase.google.com/).
                2. Clique no ícone de engrenagem (Configurações do projeto).
                3. Na aba "Geral", vá para "Seus apps".
                4. Selecione seu app Android.
                5. Clique em "Adicionar impressão digital".
                6. Cole a chave **SHA-1** que você copiou do EAS CLI e salve.

    * Instale as dependências:

        ```sh
        yarn install
        ```

    * **Compile o aplicativo com EAS Build:**

        ```sh
        eas build --profile development --platform android
        ```

        * Logo após o término do build, abra o [Expo Dev](https://expo.dev/), faça seu login e abra seu projeto.
        * Então, abra o respectivo projeto inicializado (o qual terá o build para Android incluído) e baixe o arquivo .APK

    * Execute o aplicativo em modo de desenvolvimento:

        ```sh
        npx expo start --clear
        ```

---

## 👥 Autores e Orientadores

**Desenvolvedores:**
* André Takeo Miiada Caseiro
* Gabriel Fernandes Matozinhos
* Matheus Tonini dos Santos

**Orientadores:**
* Márcio André Miranda (Orientador)
* Thalita Biazzuz Veronese (Coorientadora)

---

## 📧 Contato

**André Takeo Miiada Caseiro** - [andre.miiada@gmail.com](mailto:andre.miiada@gmail.com)

Link do Projeto: [https://gitlab.com/coegi1/colorimetro-de-baixo-custo](https://gitlab.com/coegi1/colorimetro-de-baixo-custo)