import VueFormGenerator from 'vue-form-generator'

export default {
    groups: [
        {
            legend: 'Datos del Destinatario',
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'NIF/CIF',
                    model: 'nif',
                    required: true,
                    validator: VueFormGenerator.validators.string.locale({
                        fieldIsRequired: "El NIF/CIF es oblicagorio",
                    })
                },
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
                    label: 'Email',
                    model: 'email',
                    required: false,
                    validator: ['email'],
                    validator: VueFormGenerator.validators.email.locale({
                        invalidEmail: "El email no es correcto",
                    })
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Domicilio',
                    model: 'domicilio',
                    required: false,
                    validator: ['string']
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Localidad',
                    model: 'localidad',
                    required: false,
                    validator: ['string']
                },
                {
                    type: 'select',
                    label: 'Provincia',
                    model: 'provincia',
                    featured: false,
                    required: true,
                    values: function () {
                        return [
                            { "id": "1", "name": "Álava" },
                            { "id": "2", "name": "Albacete" },
                            { "id": "3", "name": "Alicante" },
                            { "id": "4", "name": "Almería" },
                            { "id": "33", "name": "Asturias" },
                            { "id": "5", "name": "Ávila" },
                            { "id": "6", "name": "Badajoz" },
                            { "id": "7", "name": "Baleares" },
                            { "id": "8", "name": "Barcelona" },
                            { "id": "9", "name": "Burgos" },
                            { "id": "10", "name": "Cáceres" },
                            { "id": "11", "name": "Cádiz" },
                            { "id": "39", "name": "Cantabria" },
                            { "id": "12", "name": "Castellón" },
                            { "id": "51", "name": "Ceuta" },
                            { "id": "13", "name": "Ciudad Real" },
                            { "id": "14", "name": "Córdoba" },
                            { "id": "16", "name": "Cuenca" },
                            { "id": "17", "name": "Gerona" },
                            { "id": "18", "name": "Granada" },
                            { "id": "19", "name": "Guadalajara" },
                            { "id": "20", "name": "Guipúzcoa" },
                            { "id": "21", "name": "Huelva" },
                            { "id": "22", "name": "Huesca" },
                            { "id": "23", "name": "Jaén" },
                            { "id": "15", "name": "La Coruña" },
                            { "id": "26", "name": "La Rioja" },
                            { "id": "35", "name": "Las Palmas" },
                            { "id": "24", "name": "León" },
                            { "id": "25", "name": "Lérida" },
                            { "id": "27", "name": "Lugo" },
                            { "id": "28", "name": "Madrid" },
                            { "id": "29", "name": "Málaga" },
                            { "id": "52", "name": "Melilla" },
                            { "id": "30", "name": "Murcia" },
                            { "id": "31", "name": "Navarra" },
                            { "id": "32", "name": "Orense" },
                            { "id": "34", "name": "Palencia" },
                            { "id": "36", "name": "Pontevedra" },
                            { "id": "37", "name": "Salamanca" },
                            { "id": "38", "name": "Santa Cruz de Tenerife" },
                            { "id": "40", "name": "Segovia" },
                            { "id": "41", "name": "Sevilla" },
                            { "id": "42", "name": "Soria" },
                            { "id": "43", "name": "Tarragona" },
                            { "id": "44", "name": "Teruel" },
                            { "id": "45", "name": "Toledo" },
                            { "id": "46", "name": "Valencia" },
                            { "id": "47", "name": "Valladolid" },
                            { "id": "48", "name": "Vizcaya" },
                            { "id": "49", "name": "Zamora" },
                            { "id": "50", "name": "Zaragoza" },
                        ]
                    },
                    default: "37",
                    selectOptions: {
                        noneSelectedText: '- seleccione valor -',
                        hideNoneSelectedText: true,
                    },
                    validator: ['required']
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Código Postal',
                    model: 'codPostal',
                    required: true,
                    min: 5,
                    // String validator with custom error messages
                    validator: VueFormGenerator.validators.string.locale({
                        fieldIsRequired: "El código postal es oblicagorio",
                        textTooSmall: "El código postal debe tener al menos {1} caracteres",
                    })
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Observaciones',
                    model: 'observaciones',
                    required: false,
                    validator: ['string']
                },
            ]
        },
    ],
}