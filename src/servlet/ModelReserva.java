package servlet;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;

public class ModelReserva {
	private static final String ID_RESERVA = "reserva.id_reserva";
	private static final String ID_LOCAL = "reserva.id_local";
	private static final String ID_SALA = "reserva.id_sala";
	private static final String NM_RESPONSAVEL = "reserva.nm_responsavel";
	private static final String DT_INICIO = "reserva.dt_inicio";
	private static final String DT_TERMINO = "reserva.dt_termino";
	
	private int idReserva;
	private int idSala;
	private String nmResponsavel;
	private Timestamp dtInicio;
	private Timestamp dtTermino;
	
	public int getIdReserva() {
		return idReserva;
	}
	public void setIdReserva(int idReserva) {
		this.idReserva = idReserva;
	}
	public int getIdSala() {
		return idSala;
	}
	public void setIdSala(int idSala) {
		this.idSala = idSala;
	}
	public String getNmResponsavel() {
		return nmResponsavel;
	}
	public void setNmResponsavel(String nmResponsavel) {
		this.nmResponsavel = nmResponsavel;
	}
	public Timestamp getDtInicio() {
		return dtInicio;
	}
	public void setDtInicio(Timestamp dtInicio) {
		this.dtInicio = dtInicio;
	}
	public Timestamp getDtTermino() {
		return dtTermino;
	}
	public void setDtTermino(Timestamp dtTermino) {
		this.dtTermino = dtTermino;
	}
	
	public boolean update(Connection conn){
		Statement stm = null;
   		int result = 0;
   		
		try {
	    	stm = conn.createStatement();
	    	String sql = "update reserva " + 
	    	    	"set " + 
	    	    	ID_SALA + " = " + this.idSala + "," +
	    	    	NM_RESPONSAVEL + " = '" + this.nmResponsavel + "'," +
	    	    	DT_INICIO + " = '" + this.dtInicio + "'," +
	    	    	DT_TERMINO + " = '" + this.dtTermino + "'" +
	    	    	" where " + ID_RESERVA + " = " + this.idReserva;
	    	    	
	    	result = stm.executeUpdate( sql );
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		return (result > 0);
	}
}
