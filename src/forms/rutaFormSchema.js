import VueFormGenerator from 'vue-form-generator'
import moment from 'moment';

export default {
    groups: [{
        legend: 'Datos de Ruta',
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Origen',
                model: 'origen',
                placeholder: 'Origen del transporte',
                required: true,
                validator: VueFormGenerator.validators.string.locale({
                    fieldIsRequired: "El Origen es oblicagorio",
                })
            },
            {
                type: 'input',
                inputType: 'text',
                label: 'Destino',
                model: 'destino',
                placeholder: 'Destino del transporte',
                required: true,
                validator: VueFormGenerator.validators.string.locale({
                    fieldIsRequired: "El Origen es oblicagorio",
                })
            },
            {
                type: 'dateTimePicker',
                label: 'Fecha de envío',
                model: 'fechaEnvio',
                required: true,
                placeholder: "Fecha en la que se realizará el transporte",
                // min: moment("2010-01-01").toDate(),
                // max: moment("2071-01-01").toDate(),
                validator: VueFormGenerator.validators.date,

                dateTimePickerOptions: {
                    format: "DD/MM/YYYY"
                },   
            },
            {
                type: 'input',
                inputType: 'text',
                label: 'Peso',
                model: 'peso',
                required: false,
                validator: VueFormGenerator.validators.string.locale({
                    //fieldIsRequired: "El Perso es oblicagorio",
                })
            },
            {
                type: 'input',
                inputType: 'text',
                label: 'Litros',
                model: 'litros',
                required: false,
                validator: VueFormGenerator.validators.string.locale({
                    //fieldIsRequired: "El Origen es oblicagorio",
                })
            },
            {
                type: 'input',
                inputType: 'text',
                label: 'Temperatura',
                model: 'temperatura',
                required: false,
                validator: VueFormGenerator.validators.string.locale({
                    //fieldIsRequired: "El Origen es oblicagorio",
                })
            },
            {
                type: 'input',
                inputType: 'number',
                id: 'numBultos',
                label: 'Número de bultos',
                model: 'numeroBultos',
                required: false,
                
            },
            {
                type: 'checkbox',
                label: 'Muestra',
                model: 'muetra',
                default: false,
                required: false,
            },
            {
                type: 'select',
                label: 'Cliente',
                model: 'cliente',
                featured: false,
                required: true,
                selectOptions: {
                    noneSelectedText: 'Seleccione un elemento'
                },
                values: [],                
            },
            {
                type: 'select',
                label: 'Destinatario',
                model: 'destinatario',
                featured: false,
                required: true,
                selectOptions: {
                    noneSelectedText: 'Seleccione un elemento'
                },
                values: [],                
            },
            {
                type: 'select',
                label: 'Transportista',
                model: 'transportista',
                featured: false,
                required: true,
                values: [],
                selectOptions: {
                    noneSelectedText: 'Seleccione un elemento'
                },
            },
            {
                type: 'select',
                label: 'Vehiculo',
                model: 'vehiculo',
                featured: false,
                required: true,
                values: [],
                selectOptions: {
                    noneSelectedText: 'Seleccione un elemento'
                },
            },
            {
                type: 'select',
                label: 'Remolque',
                model: 'remolque',
                featured: false,
                required: true,
                values: [],
                selectOptions: {
                    noneSelectedText: 'Seleccione un elemento'
                },
            },
            {
                type: 'select',
                label: 'Mercancia',
                model: 'mercancia',
                featured: false,
                required: true,
                values: [],
                selectOptions: {
                    noneSelectedText: 'Seleccione un elemento'
                },
            },
        ]
    }]
}