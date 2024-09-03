import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 20,
  },
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: 5,
    marginBottom: 20,
    padding: 20, // Increased padding for better spacing
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  imageSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  image: {
    width: "30%",
    height: "auto",
    marginRight: 20, // Spacing between image and content
  },
  contentSection: {
    width: "70%",
  },
  text: {
    fontSize: 14, // Adjusted font size to match the component
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginBottom: 5,
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5,
  },
  statItem: {
    fontSize: 12, // Font size for stats
    marginRight: 20,
    display: "flex",
    alignItems: "center",
  },
  chartImage: {
    marginTop: 15,
    width: "100%",
    height: "auto",
    borderRadius: 5,
  },
});

const PDFDocument = ({ data, chartImage }) => {
  return (
    <Document>
      <Page>
        <Text>Hi</Text>
      </Page>
      <Page style={styles.page}>
        {data.map((post, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.imageSection}>
              <Image style={styles.image} src={post.full_picture || no_image} />
              <View style={styles.contentSection}>
                <Text style={styles.text}>
                  {post.message || "Ce post n'a pas de légende"}
                </Text>
                <Text style={styles.date}>
                  {moment(post.created_time).format("MMMM DD, YYYY")}
                </Text>
                <View style={styles.stats}>
                  <View style={styles.statItem}>
                    <Text>
                      Number of reactions: {post.reactions.summary.total_count}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text>
                      Number of Commnets: {post.comments.summary.total_count}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* Include the chart image */}
            {chartImage && <Image src={chartImage} style={styles.chartImage} />}
          </View>
        ))}
      </Page>
      <Page>
        <Text>Hi</Text>
      </Page>
    </Document>
  );
};

export default PDFDocument;
