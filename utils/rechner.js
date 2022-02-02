export const calculateMinimalProbForSparpreis = (superSparpreisTicketpreis, sparpreisTicketpreis, nahverkehrTicketpreis) => {
    console.log(superSparpreisTicketpreis, sparpreisTicketpreis, nahverkehrTicketpreis)
    let pob = (sparpreisTicketpreis - nahverkehrTicketpreis - superSparpreisTicketpreis) / (sparpreisTicketpreis - nahverkehrTicketpreis - 10)
    console.log(pob)
    if (pob <= 0 || pob >= 1 || superSparpreisTicketpreis - nahverkehrTicketpreis - 10 == 0) {
        if ((1 - 0.5) * nahverkehrTicketpreis + 0.5 * superSparpreisTicketpreis > (1 - 0.5) * (sparpreisTicketpreis - superSparpreisTicketpreis) + 0.5 * 10) {
            return 0
        } else {
            return 1
        }
    } else {
        return pob
    }
}