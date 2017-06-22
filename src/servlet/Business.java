package servlet;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Business {
	public static JSONArray getListLocal(Connection conn) throws SQLException{
		JSONArray jsonArray = new JSONArray();
		String sql = "select id_local, nm_local from local";
		ResultSet rs = Utils.getData( conn, sql );
		
		while ( rs.next() ){
			JSONObject jsonObj = new JSONObject();
			jsonObj.put("idLocal", String.valueOf( rs.getInt("id_local") ) );
			jsonObj.put("nmLocal", rs.getString("nm_local") );

			jsonArray.add( jsonObj );
		}
		
		return jsonArray;
	}
	
	public static JSONArray getListSala(Connection conn, String id_local) throws SQLException{
		JSONArray jsonArray = new JSONArray();
		String sql = "select id_sala, nm_sala from sala s inner join local l on (l.id_local = s.id_local) where l.id_local = " + id_local;
		ResultSet rs = Utils.getData( conn, sql );
		
		while ( rs.next() ){
			JSONObject jsonObj = new JSONObject();
			jsonObj.put("idLocal", String.valueOf( rs.getInt("id_sala") ) );
			jsonObj.put("nmLocal", rs.getString("nm_sala") );

			jsonArray.add( jsonObj );
		}
		
		return jsonArray;
	}
	
	public static JSONArray getReservas(Connection conn) throws SQLException{	
		String select = "select r.id_reserva, l.nm_local, r.id_sala, s.nm_sala, r.nm_responsavel, r.dt_inicio, r.dt_termino";
    	String from = " from reserva r inner join sala s on (r.id_sala = s.id_sala) inner join local l on (s.id_local = l.id_local)";

    	ResultSet rs = Utils.getData( conn, select + from );
    	SimpleDateFormat fmt = new SimpleDateFormat("dd/MM/yyyy HH:mm");
    	JSONArray jsonArray = new JSONArray();
    	
    	Integer idSala = null;
    	Integer idReserva = null;
    	String nmResponsavel = null;
    	String nmSala = null;
    	String nmLocal = null;
    	Timestamp dtInicio = null;
    	Timestamp dtTermino = null;
    	
    	while ( rs.next() ){
    		
    		idSala = rs.getInt("id_sala");
    		idReserva = rs.getInt("id_reserva");
    		nmSala = rs.getString("nm_sala");
    		nmLocal = rs.getString("nm_local");
    		nmResponsavel = rs.getString("nm_responsavel");
    		dtInicio = rs.getTimestamp("dt_inicio");
    		dtTermino = rs.getTimestamp("dt_termino");
    		
    		JSONObject jsonObj = new JSONObject();
    		jsonObj.put("idSala", String.valueOf(idSala) );
    		jsonObj.put("idReserva", String.valueOf(idReserva) );
    		jsonObj.put("nmLocal", nmLocal );
    		jsonObj.put("nmSala", nmSala );
    		jsonObj.put("nmResponsavel", nmResponsavel );
    		jsonObj.put("dtInicio", fmt.format(dtInicio) );
    		jsonObj.put("dtTermino", fmt.format(dtTermino) );
    		jsonArray.add( jsonObj );

    	}
		return jsonArray;
	}
}