"use client";

import {
  Document,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";

const navy = "#0B1F33";
const gold = "#C6A15B";

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: navy
  },
  header: {
    backgroundColor: navy,
    padding: 14,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: gold,
    alignItems: "center",
    justifyContent: "center"
  },
  logoText: {
    color: navy,
    fontSize: 8,
    fontFamily: "Helvetica-Bold"
  },
  headerText: {
    color: gold,
    fontSize: 11,
    fontFamily: "Helvetica-Bold"
  },
  subheader: {
    color: "#f8f5ee",
    fontSize: 8,
    marginTop: 2
  },
  title: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
    color: navy
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: gold
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d6c48a"
  },
  headerRow: {
    backgroundColor: navy
  },
  cell: {
    flex: 1,
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#d6c48a"
  },
  headerCell: {
    color: gold,
    fontFamily: "Helvetica-Bold"
  },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 28,
    right: 28,
    fontSize: 8,
    color: "#667085",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export function BrandedPdfDocument({
  title,
  headers,
  rows
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>NMPA</Text>
          </View>
          <View>
            <Text style={styles.headerText}>
              Ministry of Nomadic and Pastoral Affairs, Niger State
            </Text>
            <Text style={styles.subheader}>Official administrative export</Text>
          </View>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.table}>
          <View style={[styles.row, styles.headerRow]}>
            {headers.map((header) => (
              <View key={header} style={styles.cell}>
                <Text style={styles.headerCell}>{header}</Text>
              </View>
            ))}
          </View>
          {rows.map((row, rowIndex) => (
            <View key={`${rowIndex}-${row[0] ?? ""}`} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <View key={`${rowIndex}-${cellIndex}`} style={styles.cell}>
                  <Text>{cell || "—"}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.footer} fixed>
          <Text>Confidential — for official use only</Text>
          <Text>Generated {new Date().toLocaleString("en-GB")}</Text>
        </View>
      </Page>
    </Document>
  );
}
