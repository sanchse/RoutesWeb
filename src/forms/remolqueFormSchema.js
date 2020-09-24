import VueFormGenerator from 'vue-form-generator'

export default {
    groups: [
        {
            legend: 'Datos del Remolque',
            fields: [                
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Nombre',
                    model: 'nombre',
                    required: true,
                    validator: VueFormGenerator.validators.string.locale({
                        fieldIsRequired: "El nombre es oblicagorio",
                    })
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Matrícula',
                    model: 'matricula',
                    required: true,
                    validator: VueFormGenerator.validators.string.locale({
                        fieldIsRequired: "La matrícula es oblicagoria",
                    })
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Marca',
                    model: 'marca',
                    required: false,
                    // validator: VueFormGenerator.validators.string.locale({
                    //     fieldIsRequired: "La marca es oblicagoria",
                    // })
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Modelo',
                    model: 'modelo',
                    required: false,
                    min: 0,
                    // validator: VueFormGenerator.validators.string.locale({
                    //     fieldIsRequired: "El modelo es oblicagorio",
                    // })
                },
            ]
        },
    ],
}