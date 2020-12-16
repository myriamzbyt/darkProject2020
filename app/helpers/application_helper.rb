module ApplicationHelper
  def flash_class(level, sticky: false, fixed: false)
    class_names = case level
    when 'notice'
      ['alert-success']
    when 'alert'
      ['alert-danger']
    when 'timedout'
      ['alert-danger']
    end
    if sticky
      class_names << 'sticky'
    end
    if fixed
      class_names << 'alert-fixed'
    end
    class_names.join(' ')
    end
end
