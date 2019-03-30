import * as React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    width: '50%',
  },
  title: {
    fontSize: 24,
    textAlign: 'left',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'left',
  },
  textMed: {
    margin: 12,
    fontSize: 16,
    textAlign: 'left',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
});
const PDFGenerator = (
  <Document>
    <Page size="A5" orientation="landscape" style={styles.body}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.textMed}>
            Platba pre - 
          </Text>
          <Text style={styles.text}>Tel: (Telefón) </Text>
          <Text style={styles.title}>Objednávkový list</Text>
          <Text style={styles.textMed}>
            Dátum vytvorenia:
          </Text>
          <Text style={styles.text}>
            Splatnosť:
          </Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.textMed}>Dátum odchodu</Text>
        </View>
      </View>
      
      <Text style={styles.text}>
        Popis
      </Text>
    </Page>
  </Document>
);

export default PDFGenerator;
