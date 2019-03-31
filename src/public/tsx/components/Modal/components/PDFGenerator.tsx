import * as React from 'react';
import { Page, Image, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

/* const calculatePrice = (programArr: boolean[], priceArr: number[]) => {
  let computedPrice = 0;
  console.log(programArr);
  console.log(priceArr)
  
  for (let i = 0; i < programArr.length; i + 1) {
    if (programArr[i]) {
      computedPrice += priceArr[i];
    }
  }

  console.log(computedPrice);

  return computedPrice;
}; */

const PDFGenerator = ({ pdfData }) => {
  const { date, note, program, spz, prizeSum, tel } = pdfData;
  const programTitle = ['COMFORT', 'EXCLUSIVE', 'EXTERIÉR', 'INTERIÉR', 'PREMIUM EXTERIÉR', 'PREMIUM INTERIÉR', 'AVANGARDE', 'TOP GLANZ'];
  const programPrize = [30, 78, 16, 21, 98, 108, 58, 68];
  
  return (
    <Document>
      <Page size="A5" orientation="landscape" style={styles.body}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.text}>Platba pre:</Text>
            <Text style={[styles.textSmall, { marginBottom: 0 }]}>ŠPZ: {spz}</Text>
            <Text style={[styles.textSmall, { marginBottom: 0 }]}>Tel: (Telefón) {tel}</Text>
            <Text style={styles.text}>Objednávkový list</Text>
            <Text style={styles.textSmall}>
              Dátum vytvorenia / Splatnost: {date}
            </Text>
          </View>
          <View style={styles.col}>
            <Image src="/assets/images/logo.png" style={styles.image} />
            <Text style={[styles.textSmall, { marginBottom: 0 }]}>Car wellness s.r.o</Text>
            <Text style={[styles.textSmall, { marginBottom: 0 }]}>J.Grešáka 2877/22</Text>
            <Text style={[styles.textSmall, { marginBottom: 0 }]}>085 01, Bardejov</Text>
            <Text style={[styles.textSmall, { marginBottom: 0 }]}>Slovenská republika</Text>
            <Text style={[styles.textSmall, { marginBottom: 0 }]}>ICO: 46 471 308</Text>
            <Text style={[styles.textSmall, { marginBottom: 0 }]}>DIC: 2023405230</Text>
            <Text style={[styles.textSmall, { marginBottom: 0 }]}>Dátum odchodu:</Text>
          </View>
        </View>
        
        <View style={styles.row}>
          <View style={styles.col30}>
            <Text style={styles.textSmall}>Popis</Text>
          </View>
          <View style={styles.col30}>
            <Text style={styles.textSmall}>&nbsp;</Text>
          </View>
          <View style={styles.col30}>
            <Text style={styles.textSmall}>Suma</Text>
          </View>
        </View>
        {
          program.map((item: any, i: number) => {
            return (
              item ? (
                <View style={styles.row} key={i}>
                  <View style={styles.col30}>
                    <Text style={styles.textSmall}>{`${programTitle[i]}`}</Text>
                  </View>
                  <View style={styles.col30}>
                    <Text style={styles.textSmall}>&nbsp;</Text>
                  </View>
                  <View style={styles.col30}>
                    <Text style={styles.textSmall}>{`${programPrize[i]},-€`}</Text>
                  </View>
                </View>
              ) : null
            );
          })
        }
        <View style={styles.rowBig}>
          <View style={styles.col30}>
            <Text style={styles.textSmall}>Peciatka a podpis:</Text>
          </View>
          <View style={styles.col30}>
            <Text style={styles.textSmall}>Prevzal:</Text>
          </View>
          <View style={styles.col30}>
            <Text style={styles.textSmall}>Celková ciastka:</Text>
            <Text style={styles.textSmall}>{prizeSum},- €</Text>
            <Text style={styles.textSmall}>Spôsob platby: Hotovosť</Text>
          </View>
        </View>
        <Text style={styles.textSmall}>
          Poznámky: {note.indexOf('undefined') > -1 ? '' : note}
        </Text>
        <Text style={styles.textExtraSmall}>
          UPOZORNENIE!
        </Text>
        <Text style={styles.textExtraSmall}>
          Prosíme zákazníkov, aby pred odovzdaním svojho vozidla do CARWELLNESS starostlivo skontrolovali stav automobilu a nahlásili obsluhe prípadne poškodenie.
        </Text>
        <Text style={styles.textExtraSmall}>
          Detské autosedacky musia byť uvolnené, aby boli vycistené, ich spätné upevnenie nevykonávame.
        </Text>
        <Text style={styles.textExtraSmall}>
          Pri umývaní motora nenesieme zodpovednosť za poškodenie (umývanie motora na vlastnú zodpovednosť).
        </Text>
        <Text style={styles.textExtraSmall}>
          Mini a malé auto -10%, limuzína, MPV, SUV +10%, veľké SUV +15%, dodávka +20%, motorka 8-15€.
        </Text>
        <Text style={styles.textExtraSmall}>
          Extra znecistenie exteriéru ci interiéru - príplatok 10 €
        </Text>
        <Text style={styles.textExtraSmall}>
          casy programov sú uvedené orientacne, záleží na znecistení vozidla. Ceny sú uvedené vrátane DPH.
        </Text>
        <Text style={styles.textExtraSmall}>
          Pred odchodom si automobil dôkladne skontrolujte.
        </Text>
        <Text style={styles.textExtraSmall}>
          Neskoršie reklamácie nepríjmame.
        </Text>
        <Text style={styles.textExtraSmall}>
          Za cennosti, hotovost a parkovaciu kartu nerucíme.
        </Text>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  bold: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  rowBig: {
    flexDirection: 'row',
    height: '20%',
  },
  col: {
    width: '50%',
  },
  col30: {
    width: '33%',
  },
  text: {
    margin: 10,
    fontSize: 10,
    textAlign: 'left',
  },
  textSmall: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 8,
    textAlign: 'left',
  },
  textExtraSmall: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 10,
    fontSize: 4,
    textAlign: 'left',
  },
  image: {
    marginVertical: 15,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '40%',
  },
});

export default PDFGenerator;
