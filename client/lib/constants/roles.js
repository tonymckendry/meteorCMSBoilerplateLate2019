export const roles = {
    customer: { name: 'Customer', description: 'Regular user with no special permissions' },
    stylist: {
        name: 'Stylist',
        description: 'Can view customer info'
    },
    admin: {
        name: 'Admin',
        description: 'Sales Manager role - View customer info, promote and demote stylists'
    }
}
