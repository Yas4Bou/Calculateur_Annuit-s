function calculer() {
    // Récupérer les valeurs des champs du formulaire
    var n = parseInt(document.getElementById('années').value); // Durée en années
    var i = parseFloat(document.getElementById('taux').value) / 100; // Taux d'intérêt annuel en décimal
    var V0 = parseInt(document.getElementById('Montant').value); // Montant de l'emprunt
    var period = document.getElementById('Periodicité').value; // Périodicité des remboursements

    // Initialiser les variables pour le tableau d'emprunt
    var tableauEmprunt = "<tr><th>Périodes</th><th>Capital restant dû en début de période</th><th>Intérêts de la période</th><th>Amortissement du Capital</th><th>Annuité constante (ou mensualité) </th><th>Capital restant dû en fin de période</th></tr>";
    var capitalDebutPeriode = V0; 

    // Générer le tableau d'emprunt en fonction de la périodicité choisie
    if (period === "Annuel") {
        var annuite = V0 * i / (1 - Math.pow((1 + i), -n)); // Calcul de l'annuité constante
        for (var periode = 1; periode <= n; periode++) {
            // Calculer les valeurs pour chaque période
            var interets = capitalDebutPeriode * i;
            var amortissement = annuite - interets;
            var capitalFinPeriode = capitalDebutPeriode - amortissement;

            // Ajouter la ligne au tableau
            tableauEmprunt += "<tr><td>" + periode + "</td><td>" + capitalDebutPeriode.toFixed(2) + "</td><td>" + interets.toFixed(2) + "</td><td>" + amortissement.toFixed(2) + "</td><td>" + annuite.toFixed(2) + "</td><td>" + capitalFinPeriode.toFixed(2) + "</td></tr>";

            // Mettre à jour le capital en début de la prochaine période
            capitalDebutPeriode = capitalFinPeriode;
        }
    } else if (period === "Mensuel") {
        var im = Math.pow((1 + i), 1 / 12) - 1; // Calcul du taux d'intérêt mensuel
        var mensuel = V0 * im / (1 - Math.pow((1 + im), (-n * 12))); // Calcul de l'annuité constante
        for (var mois = 1; mois <= n * 12; mois++) {
            // Calculer les valeurs pour chaque mois
            var interets = capitalDebutPeriode * im;
            var amortissement = mensuel - interets;
            var capitalFinPeriode = capitalDebutPeriode - amortissement;

            // Ajouter la ligne au tableau
            tableauEmprunt += "<tr><td>" + mois + "</td><td>" + capitalDebutPeriode.toFixed(2) + "</td><td>" + interets.toFixed(2) + "</td><td>" + amortissement.toFixed(2) + "</td><td>" + mensuel.toFixed(2) + "</td><td>" + capitalFinPeriode.toFixed(2) + "</td></tr>";

            // Mettre à jour le capital en début de la prochaine période
            capitalDebutPeriode = capitalFinPeriode;
        }
    }

    document.getElementById("resultat").innerHTML = "<table>" + tableauEmprunt + "</table>";
}


