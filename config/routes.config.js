const express = require('express');
const router = express.Router();
let employees = require('./employees.json')

// Número total de empleados
var total_employees = Object.keys(employees).length;

// Keys para cada empleado de acuerdo al formato recibido.

let keys_employees = [
    'name',
    'age',
    'phone',
    'privileges',
    'favorites',
    'finished',
    'badges',
    'points'
]

// Problemas 1,2,3,5,7: [Todos involucran la dirección /api/employees]

router.get('/employees', function (req,res) {

    // employees después de todos los filtros. Resultado final en caso de ningún error.
    let employees_to_show=employees;

    let page = req.query.page;
    let user = req.query.user;
    let badges = req.query.badges;

    let error_found=false;
    let error_details={}; // Más que todo para el filtro con page.

    //Filtramos deacuerdo a la página. Si la hay.

    if(page){

        // Revisamos si page es un entero
        let page_int = parseInt(page);

        if(isNaN(page_int) || page_int<=0){

            error_found=true;
            error_details={"error":"not a positive integer page"};
        
        }else{

            if (2*(page_int - 1) +1 < total_employees ){

                let employees_subset=[]

                for(var i = 2*(page_int - 1); i<2*(page_int - 1)+2; i++){
                    employees_subset.push(employees[i]);
                }

                employees_to_show = employees_subset;

                //res.status(201).json(employees_subset);

            }else{

                error_found=true;
                error_details={"error":"page limits out of range"};

                
            }
        }
    }

    //Filtramos de acuerdo al user.

    if(user){

        if(user==="true"){
            employees_to_show=employees_to_show.filter(function (emp) {
                return emp.privileges==="user";
            });
        } else if (user=="false"){
            employees_to_show=employees_to_show.filter(function (emp) {
                return emp.privileges!="user";
            });
        }

    }

    // Filtramos de acuerdo al badge.

    if(badges){

        employees_to_show=employees_to_show.filter(function (emp) {
            // Revisar si badges contiene al badges del GET.
            return emp.badges.indexOf(badges)!=-1;
        });

    }

    // Respuesta final.
    if(error_found){
        res.status(500).json(error_details);
    }else{
        res.status(201).json(employees_to_show);
    }

}
)

// Problema 4:

router.get('/employees/oldest', function (req,res) {

    // Podemos utilizar la función sort para arreglar objetos json en Javascript.
    let employees_age_sorted= employees.sort(function(emp1, emp2) {
        return emp2.age - emp1.age;
    });
    // Regresamos la primera ocurrencia.
    res.status(201).json(employees_age_sorted[0]);
}
)

// Problema 6:

router.post('/employees', function (req,res){

    let body = req.body;

    // Verificamos si body tiene el mismo formato que el de cada empleado en 
    // employees.json

    if(req.body.length){

        // Quiere decir que recibimos una lista de diccionarios.
        console.log(`Hay ${req.body.length} empleados por agregar`);

        let employees_new=employees; // Variable temporal a la que le agregaremos empleados.
        var error = false;
        
        for(let i =0; i<req.body.length; i++){

            let this_emp=req.body[i];
            let keys_body = Object.keys(this_emp);

            if(JSON.stringify(keys_employees)==JSON.stringify(keys_body)){

                console.log("Formato correcto, se agrega el empleado.");
                // Esto se agrega hasta que se refresca el npm run dev.
                employees_new.push(this_emp);
    
            }else{

                console.log("HAY UN ERROR")
                error = true; 
                break;
            }
        }

        if(error){
            res.status(501).json({"code": "bad_request"});
        }else{
            // Esto se agrega hasta que se refresca el npm run dev.
            employees=employees_new;
            res.status(201).json({"code": "employee(s) added."});
        }

    }else{

        //Quiere decir que sólo recibimos un diccionario.
        let keys_body = Object.keys(req.body);
        
        //Veamos que ambos diccionarios (el del body y el por defecto, tengan las mismas claves).
        
        if(JSON.stringify(keys_employees)==JSON.stringify(keys_body)){

            console.log("Formato correcto, se agrega el empleado.");
            // Esto se agrega hasta que se refresca el npm run dev.
            employees.push(req.body);
            
            res.status(201).json({"code": "employee(s) added."});

        }else{
            res.status(501).json({"code": "bad_request"});
        }

    }

})

// Problema 8:

router.get('/employees/:NAME', function (req,res) {

    console.log(employees);

    // Obtenemos el nombre de los parámetros de la url
    let NAME = req.params['NAME'];
    
    // Filtramos employees con este nombre.
    let employee_this_name= employees.filter(function (emp) {
        return emp.name===NAME;
    });

    //Regresamos error si no hay empleados con ese nombre.
    if(employee_this_name.length===0){
        res.status(404).json({'code':'not_found'});
    }else{
        res.status(201).json(employee_this_name);
    }
})

module.exports = router;
