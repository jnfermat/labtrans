package servlet;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;

public class ModelReserva {
	private static final String ID_RESERVA = "reserva.id_reserva";
	private static final String ID_SALA = "reserva.id_sala";
	private static final String NM_RESPONSAVEL = "reserva.nm_responsavel";
	private static final String DT_INICIO = "reserva.dt_inicio";
	private static final String DT_TERMINO = "reserva.dt_termino";
	private static final String DESCRICAO = "reserva.descricao";
	private static final String NR_PESSOAS = "reserva.nr_pessoas";
	private static final String CAFE = "reserva.cafe";
	
	public static final String STATUS_NEW = "NEW";
	public static final String STATUS_MODIFED = "MODIFED";
	
	private int idReserva;
	private int idSala;
	private String nmResponsavel;
	private String descricao;
	private Timestamp dtInicio;
	private Timestamp dtTermino;
	private String cafe;
	private int nrPessoas;
	
	private String statusModel = STATUS_NEW;
	

	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public String getCafe() {
		return cafe;
	}
	public void setCafe(String cafe) {
		this.cafe = cafe;
	}
	public int getNrPessoas() {
		return nrPessoas;
	}
	public void setNrPessoas(int nrPessoas) {
		this.nrPessoas = nrPessoas;
	}
	public String getStatusModel() {
		return statusModel;
	}
	public void setStatusModel(String statusModel) {
		this.statusModel = statusModel;
	}
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
   		String sql = null;
   		
		try {
	    	stm = conn.createStatement();
	    	if ( STATUS_NEW.equals(this.statusModel) ){
	    		sql = "insert into reserva (id_reserva, id_sala, nm_responsavel, descricao, cafe, nr_pessoas, dt_inicio, dt_termino) " + 
		    	    	"values( "
		    	    	 + this.idReserva + ","
		    	    	 + this.idSala + ","
		    	    	 + "'" + this.nmResponsavel + "',"
		    	    	 + "'" + this.descricao + "',"
		    	    	 + "'" + this.cafe + "',"
		    	    	 + "'" + this.nrPessoas + "',"
		    	    	 + "'" + this.dtInicio + "',"
		    	    	 + "'" + this.dtTermino + "')";
	    	} else {
		    	sql = "update reserva " + 
		    	    	"set " + 
		    	    	ID_SALA + " = " + this.idSala + "," +
		    	    	NM_RESPONSAVEL + " = '" + this.nmResponsavel + "'," +
		    	    	DESCRICAO + " = '" + this.descricao + "'," +
		    	    	CAFE + " = '" + this.cafe + "'," +
		    	    	NR_PESSOAS + " = " + this.nrPessoas + "," +
		    	    	DT_INICIO + " = '" + this.dtInicio + "'," +
		    	    	DT_TERMINO + " = '" + this.dtTermino + "'" +
		    	    	" where " + ID_RESERVA + " = " + this.idReserva;
	    	}
	    	    	
	    	result = stm.executeUpdate( sql );
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		return (result > 0);
	}
	
	public static int getLastIdReserva(Connection conn){
		String select = "select max(id_reserva) ";
    	String from = " from reserva";
    	int result = 0;
    	ResultSet rs = Utils.getData( conn, select + from );
    	
    	try {
			if ( rs.next() )
				result = rs.getInt(1);
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	return result;

	}
}
