package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Timestamp;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 * Servlet implementation class Consulta
 */
@WebServlet("/Controller")
public class Controller extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public Controller() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	private void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException
	{ 
		String action = request.getParameter("action");

	    Connection conn = Utils.getMySqlConnection(); 
   		JSONArray jsonArray = new JSONArray();

	    try 
	    {
	    	if ( action != null ){
	    		action = action.trim().toLowerCase();
	    		String what = request.getParameter("what");
	    		boolean result = true;
	    		
	    		if ( "read".equals(action) ){
	    			if ( "getReservas".equals( what ) ){
	    	    		jsonArray = Business.getReservas( conn );
	    	    	} else if ( "getListLocal".equals( what ) ){
	    	    		jsonArray = Business.getListLocal( conn );
	    	    	} else if ( "getListSala".equals( what ) ){
	    	    		String id_local = request.getParameter("id_local");
	    	    		jsonArray = Business.getListSala( conn, id_local );
	    	    	} 
	    		} else if ( "delete".equals( action ) ){
    	    		String idReserva = request.getParameter("idReserva");
    	    		result = Business.deleteReserva( conn, idReserva );
    	    	} else if ( "write".equals( action ) || "insert".equals( action ) ){
    	    		String idReserva = request.getParameter("idReserva");
    	    		String idSala = request.getParameter("idSala");
    	    		String responsavel = request.getParameter("responsavel");
    	    		String dtIni = request.getParameter("dtIni");
    	    		String dtFim = request.getParameter("dtFim");
    	    		String cafe = request.getParameter("cafe");
    	    		String descricao = request.getParameter("descricao");
    	    		String nrPessoas = request.getParameter("nrPessoas");
    	    		
    	    		ModelReserva modelReserva = new ModelReserva();
    	    		modelReserva.setDtInicio( Timestamp.valueOf(dtIni) );
    	    		modelReserva.setDtTermino( Timestamp.valueOf(dtFim) );
    	    		modelReserva.setIdSala( Integer.parseInt(idSala) );
    	    		modelReserva.setNmResponsavel( responsavel );
    	    		modelReserva.setDescricao( descricao );
    	    		modelReserva.setCafe( cafe );
    	    		modelReserva.setNrPessoas( Integer.parseInt(nrPessoas) );
    	    		
    	    		if ( "write".equals( action ) ){
    	    			modelReserva.setIdReserva( Integer.parseInt(idReserva) );
    	    			modelReserva.setStatusModel( ModelReserva.STATUS_MODIFED );
    	    		}else{
    	    			modelReserva.setIdReserva( ModelReserva.getLastIdReserva(conn) + 1 );
    	    			modelReserva.setStatusModel( ModelReserva.STATUS_NEW );
    	    		}
    	    		
    	    		result = Business.writeReserva( conn, modelReserva );
    	    		JSONObject jsonObj = new JSONObject();
    				jsonObj.put("sucess", result );
    				jsonArray.add( jsonObj );
    	    	}
	    	}
	    } catch (SQLException e) {
			e.printStackTrace();
		} finally{
			if ( conn != null ){
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
	    PrintWriter out = response.getWriter();	    
    	response.setContentType("application/json");
    	
	    if ( action != null ){
	    	if ( "read".equals(action) )
	    		out.write( jsonArray.toJSONString() );
	    	else if ( "delete".equals(action) || "write".equals(action) || "insert".equals(action) )
	    		out.write( jsonArray.get(0).toString() );
	    }
		out.close();
	}
}
