### Cofiguraciones a tener en cuenta.


### Bases de datos
Para trabajar en local es importante tener en cuenta!:

Agregar el archivo: **.env.properties** en la carpeta resources. No! se subirá al repo solo estará en local.
Modificar de  **.env.properties.example**

``` bash 
.env.properties
```
El archibo tendrá las siguientes variables: 

```bash
MYSQLDB_URL=jdbc:mysql://localhost:3306/nocountry_test
MYSQLDB_USER=root
MYSQLDB_PASSWORD=admin
```

**MYSQLDB_URL** Guardará el host de la base de datos junto con el puerto seguido del nombre de la base de datos.

**MYSQLDB_USER** usuario de la base de datos.

**MYSQLDB_PASSWORD** contraseña de la base de datos.


### Versiones utilizadas.

JDK usado: **java 17 LTS**

Mysql : **8.0.33**

se utiliza Maven 


### Tener en cuenta!

Rama de desarrollo

```bash
backend-dev
```
Rama main del deploy 
```bash
backend 
```
cada cambio se subira a **backend-dev**

Importante seguir las configuraciones para prevenir caidas o problemas en produccion.