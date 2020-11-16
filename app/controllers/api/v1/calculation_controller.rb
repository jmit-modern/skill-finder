require 'net/http'
require 'uri'
# app/controllers/api/v1/calculation_controller.rb
class Api::V1::CalculationController < ActionController::API
  
  def estimate_result
    result ||= {}
    if post_params[:appTarget] == "webonly"
      result[:backend] = backend_data
      if post_params[:frontend] != "unnecessary"
        result[:frontend] = frontend_data
      end
    elsif post_params[:appTarget] == "webapp_include_ios"
      result[:backend] = backend_data
      if post_params[:frontend] != "unnecessary"
        result[:frontend] = frontend_data
      end
      result[:iOS_app] = iOS_data
    elsif post_params[:appTarget] == "webapp_include_android"
      result[:backend] = backend_data
      if post_params[:frontend] != "unnecessary"
        result[:frontend] = frontend_data
      end
      result[:android_app] = android_data
    elsif post_params[:appTarget] == "webapp_include_both_ios_android"
      result[:backend] = backend_data
      if post_params[:frontend] != "unnecessary"
        result[:frontend] = frontend_data
      end
      result[:iOS_app] = iOS_data
      result[:android_app] = android_data
    elsif post_params[:appTarget] == "iOSonly"
      result[:iOS_app] = iOS_data
    elsif post_params[:appTarget] == "androidonly"
      result[:android_app] = android_data
    elsif post_params[:appTarget] == "iOS_android"
      result[:android_app] = android_data
      result[:iOS_app] = iOS_data
    elsif post_params[:appTarget] == "windowsapp"
      result[:windows_app] = windowsapp_data
    elsif post_params[:appTarget] == "macosapp" 
      result[:macOS_app] = macosapp_data
    elsif post_params[:appTarget] == "arduino" || post_params[:appTarget] == "raspberrypi"
      result[:IoT_microcom] = iot_microcom_data
    elsif post_params[:appTarget] == "embedother"
      result[:device_driver] = iot_microcom_data
    end

    if post_params[:adminDashboard] == "yes"
      result[:admin_dashboard] = admin_dashboard_data
    end

    if !post_params[:technology].empty?
      result[:technology] = technology_data
    end

    if !post_params[:nonFunctions].empty?
      result[:nonfunctions] = nonfunctions_data
    end

    render json: result
  end

  def create_project
    result ||= { 
      :message => "okay"
     }
    render json:result
  end

  private

  def post_params
    # params.permit(:appTarget, :database, :designer, :devLanguage, :frontend, :infrastructure, :priority, :projectFeature, :projectName, :requirements, :technology => [], :_persist, :calculation)
    params.permit!
  end

  def backend_data
    { 
      :defining_requirements => {
        :backend_architect => 3, :database_design => 3
      },
      :staging_construction => {
        :infra_engineer => 2
      },
      :dbtable_design => {
        :backend_architect => 2
      },
      :implementation => {
        :backend_programmer => 10
      },
      :api_implementation => {
        :backend_programmer => 10
      },
      :test => {
        :test_design => 3, :test_execution => 5
      },
      :building_prod_env => {
        :infra_engineer => 2
      },
      :subtotal => 40
    }
  end

  def frontend_data
    { 
      :defining_requirements => {
        :frontend_architect => 3
      },
      :element_design => {
        :designer => 5
      },
      :implementation => {
        :frontend_programmer => 10
      },
      :test => {
        :test_execution => 5
      },
      :server_integration_test => {
        :test_design => 3, :test_execution => 5
      },
      :subtotal => 31
    }
  end

  def iOS_data
    { 
      :defining_requirements => {
        :iOS_programmer => 3
      },
      :element_design => {
        :designer => 5
      },
      :implementation => {
        :iOS_programmer => 10
      },
      :test => {
        :test_execution => 5
      },
      :server_integration_test => {
        :test_design => 3, :test_execution => 5
      },
      :subtotal => 31
    }
  end

  def android_data
    { 
      :defining_requirements => {
        :android_programmer => 3
      },
      :element_design => {
        :designer => 5
      },
      :implementation => {
        :android_programmer => 10
      },
      :test => {
        :test_execution => 5
      },
      :server_integration_test => {
        :test_design => 3, :test_execution => 5
      },
      :subtotal => 31
    }
  end

  def admin_dashboard_data
    {
      :defining_requirements => {
        :backend_architect => 3, :database_design => 3
      },
      :staging_construction => {
        :infra_engineer => 2
      },
      :dbtable_design => {
        :backend_architect => 3
      },
      :implementation => {
        :backend_programmer => 10
      },
      :api_implementation => {
        :backend_programmer => 10
      },
      :test => {
        :test_design => 3, :test_execution => 5
      },
      :building_prod_env => {
        :infra_engineer => 2
      },
      :subtotal => 41
    }
  end

  def windowsapp_data
    { 
      :defining_requirements => {
        :windows_programmer => 3
      },
      :element_design => {
        :designer => 5
      },
      :implementation => {
        :windows_programmer => 10
      },
      :test => {
        :test_design => 3, :test_execution => 5
      },
      :subtotal => 26
    }
  end
  
  def macosapp_data
    { 
      :defining_requirements => {
        :macos_programmer => 3
      },
      :element_design => {
        :designer => 5
      },
      :implementation => {
        :macos_programmer => 10
      },
      :test => {
        :test_design => 3, :test_execution => 5
      },
      :subtotal => 26
    }
  end
  
  def iot_microcom_data
    { 
      :defining_requirements => {
        :iot_microcom_programmer => 3
      },
      :test => {
        :test_design => 3
      },
      :device_test => {
        :test_design => 3, :test_execution => 5
      },
      :subtotal => 14
    }
  end

  def technology_data
    result ||= {}
    if post_params[:technology].include? "artificialIntelligence"
      result[:artificial_intelligence] = {
        :ai_engineer => 20
      }
    end
    if post_params[:technology].include? "videoStreaming"
      result[:video_streaming] = {
        :infra_engineer => 20
      }
    end
    if post_params[:technology].include? "chatBot"
      result[:chatbot] = {
        :backend_engineer => 10
      }
    end
    if post_params[:technology].include? "scalability"
      result[:scalability] = {
        :infra_engineer => 10, :backend_engineer => 10
      }
    end
    if post_params[:technology].include? "highPerformance"
      result[:high_performance] = {
        :infra_engineer => 10
      }
    end
    if post_params[:technology].include? "GPS_beacon"
      result[:gps_beacon] = {
        :frontend_engineer => 10
      }
    end
    if post_params[:technology].include? "DRM_security"
      result[:drm_security] = {
        :security_engineer => 20
      }
    end

    return result
  end

  def nonfunctions_data
    result ||= {}
    if post_params[:nonFunctions].include? "authentication"
      result[:authentication] = {
        :backend_engineer => 10
      }
    end
    if post_params[:nonFunctions].include? "backup"
      result[:backup] = {
        :backend_engineer => 5
      }
    end
    if post_params[:nonFunctions].include? "dataMigration"
      result[:data_migration] = {
        :backend_engineer => 10
      }
    end
    if post_params[:nonFunctions].include? "monitoringAlert"
      result[:monitoring_alert] = {
        :backend_engineer => 10
      }
    end

    return result
  end

end