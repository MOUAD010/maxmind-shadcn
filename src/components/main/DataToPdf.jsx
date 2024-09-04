import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import moment from "moment";
import no_image from "../../assets/noimage.jpg";
import rubik from "../../assets/Rubik-Regular.ttf";
import logo from "../../assets/longbanner.png";
// Register font from local file
Font.register({
  family: "Rubik",
  src: rubik, // Update this path according to where you placed the font
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Rubik",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: 5,
    marginBottom: 10,
    padding: 15, // Increased padding for better spacing
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  imageSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 0,
  },
  image: {
    width: "30%",
    height: "80%",
    marginRight: 20, // Spacing between image and content
  },
  contentSection: {
    width: "70%",
  },
  text: {
    fontSize: 10, // Adjusted font size to match the component
    marginBottom: 5,
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
    fontSize: 10, // Font size for stats
    marginRight: 20,
    display: "flex",
    alignItems: "center",
  },
  chartImage: {
    width: "100%",
    height: "auto",
    borderRadius: 5,
    marginTop: -25,
  },
});

const PDFDocument = ({ data, chartImage }) => {
  return (
    <Document>
      <Page
        style={{
          display: "flex",
          justifyContent: "center", // Centers content vertically
          alignItems: "center", // Centers content horizontally
          height: "100vh", // Ensures the page takes up full viewport height
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center", // Centers content vertically within View
            alignItems: "center", // Centers content horizontally within View
            textAlign: "center",
          }}
        >
          <Text style={{ marginBottom: 2, fontSize: 30 }}>
            Social Media Report
          </Text>
          <Text style={{ marginBottom: 15 }}>By</Text>
          <Image
            src={logo}
            style={{ width: 350, height: 200, borderRadius: 10 }}
          />
        </View>
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
      <Page
        style={{
          display: "flex",
          justifyContent: "center", // Centers content vertically
          alignItems: "center", // Centers content horizontally
          height: "100vh", // Ensures the page takes up full viewport height
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center", // Centers content vertically within View
            alignItems: "center", // Centers content horizontally within View
            textAlign: "center",
          }}
        >
          <Text style={{ marginBottom: 2, fontSize: 30 }}>Thank </Text>
          <Text style={{ marginBottom: 2, fontSize: 30 }}>you</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
