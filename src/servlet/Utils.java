package servlet;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;

public class Utils {
	public static Connection getMySqlConnection(String projectPath){
		Connection conn = null;         
   		
		try {
			File file = new File( projectPath + "/WEB-INF/db.xml");
			DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
			Document document = documentBuilder.parse(file);
			String usr = document.getElementsByTagName("user").item(0).getTextContent();
			String pwd = document.getElementsByTagName("password").item(0).getTextContent();
			Class.forName("com.mysql.jdbc.Driver");
	    	conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/labtrans",usr,pwd);
	    	
		} catch (ClassNotFoundException | SQLException | ParserConfigurationException | SAXException | IOException e) {
			e.printStackTrace();
		}
		return conn;
	}
	
	public static ResultSet getData(Connection conn, String sql){        
   		ResultSet rs = null;
   		Statement stm = null;
   		
		try {
	    	stm = conn.createStatement();
	    	rs = stm.executeQuery( sql );
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		return rs;
	}
}
