Passo-a-passo para executar o SISTEMA DE RESERVAS

1) É necessário ter instalado o banco de dados MySQL versão 5 ou superior - link para download: https://www.mysql.com/downloads/
1.1) Acesse o MySQL, crie o banco de dados "labtrans"
1.2) Rode o script labtrans.sql para criar as tabelas
2) É necessário ter instalado o JAVA 7 ou superior(32 ou 64 bits) - link para instalação: https://java.com/pt_BR/download/
3) Faça download do Tomcat 7 - link para download: http://ftp.unicamp.br/pub/apache/tomcat/tomcat-7/v7.0.78/bin/apache-tomcat-7.0.78-windows-x86.zip
3.1) Descompacte o arquivo do Tomcat 7
4) Faça download do Eclipse JEE Neon(32 ou 64 bits) - link para download: http://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/neon/3/eclipse-jee-neon-3-win32.zip
4.1) Descompacte o arquivo baixado
4.2) Vá para a pasta que você usou para descompactar
4.3) Agora vá para a pasta "eclipse"
4.4) Crie a pasta "workspace"
4.5) Crie a pasta "labtrans" dentro da pasta "workspace"
4.6) Acesse https://github.com/jnfermat/labtrans e baixe o projeto dentro de "labtrans"
4.7) Execute o arquivo eclipse.exe dentro da pasta "eclipse"
4.8) Será solicitado "Select directory as workspace". Você deve escolher o caminho completo para a pasta "workspace", criada no item 4.4, e clique em OK
4.9) Vá em File->Open Projects from File System, clique em "Directory", escolha a pasta "labtrans" criada no item 4.5 e clique em Finish
4.10) É necessário configurar o Tomcat 7 dentro do eclipse
4.10.1) Vá Em Window->Preferences->Server->Runtime Environments
4.10.2) Clique em Add e escolha Apache Tomcat v7.0 e clique em Next
4.10.3) Informe o "Tomcat installation directory" e Finish
5) Edite, no projeto labtrans, o arquivo labtrans/war/WEB-INF/db.xml. Ajuste o user e password do servidor do MySQL
6) É necessário adicionar o projeto "labtrans" no Tomcat. Para isso, faça o seguinte:
6.1) Na aba Servers(parte inferior do Eclipse), clique com o botão direito do mouse sobre o Tomcat e escolha "Add and Remove"
6.2) Escolha o projeto "labtrans", clique em Add e Finish
6.3) Novamente, clique com o botão direito do mouse sobre o Tomcat e escolha "Start"
6.4) Aguarde o Tomcat "subir"(demora uns 5s)
6.5) No browser acesse http://localhost:8080/labtrans
