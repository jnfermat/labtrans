package servlet;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Utils {
	public static Connection getMySqlConnection(){
		Connection conn = null;         
   		
		try {
			Class.forName("com.mysql.jdbc.Driver");
	    	conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/labtrans","root","ashtar33");
		} catch (ClassNotFoundException | SQLException e) {
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
